<?php

namespace App\Http\Controllers;

use App\Models\RawMaterialTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;  // if you use Inertia for frontend rendering
use App\Models\Bakery;
use App\Models\RawMaterial;
use App\Models\Product;
class RawMaterialSupplyController extends Controller
{
    // Show Supply form page (GET)
public function index()
{
    $grouped = RawMaterialTransaction::with(['bakery:id,name', 'rawMaterial:id,name'])
        ->orderBy('created_at', 'desc') // make sure latest first
        ->get()
        ->groupBy(fn ($item) => $item->bakery_id . '-' . $item->raw_material_id)
        ->map(function ($group) {
            $first = $group->first();

            $totalSupplied = $group->where('transaction_type', 'supply')->sum('quantity');
            $totalUsed = abs($group->where('transaction_type', 'use')->sum('quantity'));
            $balance = $totalSupplied - $totalUsed;

            // Latest status from the most recent transaction in this group
            $latestStatus = $group->first()->status ?? 'pending';

            return [
                'bakery' => $first->bakery->name,
                'raw_material' => $first->rawMaterial->name,
                'total_supplied' => $totalSupplied,
                'total_used' => $totalUsed,
                'balance' => $balance,
                'status' => $latestStatus,
            ];
        })->values();

    return Inertia::render('rawMaterials/transactionIndex', [
        'transactions' => $grouped,
    ]);
}



     public function showSupplyForm()
       {
           $bakeries = Bakery::select('id', 'name')->get();
           $rawMaterials = RawMaterial::select('id', 'name')->get();

           return Inertia::render('rawMaterials/Supply', [
               'bakeries' => $bakeries,
               'rawMaterials' => $rawMaterials,
           ]);
       }

     public function showUsageForm()
     {
         $bakeries = Bakery::select('id', 'name')->get();
         $rawMaterials = RawMaterial::select('id', 'name')->get();
         $products = Product::select('id', 'name')->get(); // <-- add this

         return Inertia::render('rawMaterials/Usage', [
             'bakeries' => $bakeries,
             'rawMaterials' => $rawMaterials,
             'products' => $products, // <-- pass to frontend
         ]);
     }


    // Record a supply transaction for raw materials (POST)
 public function Supply(Request $request)
 {
     $validated = $request->validate([
         'bakery_id' => 'required|exists:bakeries,id',
         'raw_material_id' => 'required|exists:raw_materials,id',
         'quantity' => 'required|numeric|min:0.001',
         'measurement_unit' => 'required|string|max:50',
     ]);

     $user = auth()->user();

     // ✅ Use Spatie hasRole() to store actual role name
     $roleName = $user->getRoleNames()->first(); // Get the first assigned role

     RawMaterialTransaction::create([
         'bakery_id' => $validated['bakery_id'],
         'raw_material_id' => $validated['raw_material_id'],
         'user_id' => $user->id,
         'role' => $roleName ?? 'user',
         'quantity' => $validated['quantity'],
         'measurement_unit' => $validated['measurement_unit'],
         'transaction_type' => 'supply',
     ]);

     return redirect()->route('rawMaterials.index')->with('success', 'Supply recorded successfully.');
 }

 public function Usage(Request $request)
  {
      $validated = $request->validate([
          'bakery_id' => 'required|exists:bakeries,id',
          'raw_material_id' => 'required|exists:raw_materials,id',
          'quantity' => 'required|numeric|min:0.001',
          'measurement_unit' => 'required|string|max:50',
      ]);

      $user = auth()->user();

      // ✅ Calculate balance explicitly: total supply - total usage
      $totalSupplied = RawMaterialTransaction::where('bakery_id', $validated['bakery_id'])
          ->where('raw_material_id', $validated['raw_material_id'])
          ->where('transaction_type', 'supply')
          ->sum('quantity');

      $totalUsed = RawMaterialTransaction::where('bakery_id', $validated['bakery_id'])
          ->where('raw_material_id', $validated['raw_material_id'])
          ->where('transaction_type', 'use')
          ->sum('quantity'); // already negative

      $balance = $totalSupplied + $totalUsed; // available stock

      // ✅ Check if enough balance exists
      if ($validated['quantity'] > $balance) {
          return redirect()->back()->withErrors([
              'quantity' => "Only {$balance} {$validated['measurement_unit']} available for usage.",
          ])->withInput();
      }

      $roleName = $user->getRoleNames()->first();

      RawMaterialTransaction::create([
          'bakery_id' => $validated['bakery_id'],
          'raw_material_id' => $validated['raw_material_id'],
          'user_id' => $user->id,
          'role' => $roleName ?? 'user',
          'quantity' => -1 * $validated['quantity'], // store as negative
          'measurement_unit' => $validated['measurement_unit'],
          'transaction_type' => 'use',
          'status' => 'pending',
      ]);

      return redirect()->route('rawMaterials.index')->with('success', 'Usage recorded successfully.');
  }


  public function approve($id)
  {
      $user = auth()->user();

      // Only allow users with 'manager' role to approve
      if (! $user->hasRole('Manager')) {
          abort(403, 'Unauthorized');
      }

      $transaction = RawMaterialTransaction::findOrFail($id);

      // Only pending transactions can be approved
      if ($transaction->status !== 'pending') {
          return redirect()->back()->with('error', 'Only pending transactions can be approved.');
      }

      $transaction->status = 'approved';
      $transaction->save();

      return redirect()->back()->with('success', 'Transaction approved successfully.');
  }


}
