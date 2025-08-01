<?php

namespace App\Http\Controllers;

use App\Models\RawMaterialTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;  // if you use Inertia for frontend rendering
use App\Models\Bakery;
use App\Models\RawMaterial;
class RawMaterialSupplyController extends Controller
{
    // Show Supply form page (GET)
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

           return Inertia::render('rawMaterials/Usage', [
               'bakeries' => $bakeries,
               'rawMaterials' => $rawMaterials,
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

        RawMaterialTransaction::create([
            'bakery_id' => $validated['bakery_id'],
            'raw_material_id' => $validated['raw_material_id'],
            'user_id' => $user->id,
            'role' => $user->role ?? 'user',
            'quantity' => $validated['quantity'], // positive quantity for supply
            'measurement_unit' => $validated['measurement_unit'],
            'transaction_type' => 'supply',
        ]);

        return response()->json(['message' => 'Supply recorded successfully.']);
    }

    // Record a usage transaction for raw materials (POST)
    public function Usage(Request $request)
    {
        $validated = $request->validate([
            'bakery_id' => 'required|exists:bakeries,id',
            'raw_material_id' => 'required|exists:raw_materials,id',
            'quantity' => 'required|numeric|min:0.001',
            'measurement_unit' => 'required|string|max:50',
        ]);

        $user = auth()->user();

        RawMaterialTransaction::create([
            'bakery_id' => $validated['bakery_id'],
            'raw_material_id' => $validated['raw_material_id'],
            'user_id' => $user->id,
            'role' => $user->role ?? 'user',
            'quantity' => -1 * abs($validated['quantity']), // negative quantity to show usage
            'measurement_unit' => $validated['measurement_unit'],
            'transaction_type' => 'use',
        ]);

        return response()->json(['message' => 'Usage recorded successfully.']);
    }
}
