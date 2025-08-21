<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;     // Assuming User is your customer model
use App\Models\Bakery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // List all orders with pagination
    public function index()
    {
        $orders = Order::with(['customer', 'bakery'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    // Show form to create a new order
    public function create()
    {
        return Inertia::render('Orders/Create', [
            'customers' => User::select('id', 'name')->get(), // adjust 'name' if your user model differs
            'bakeries' => Bakery::select('id', 'name')->get(),
        ]);
    }

    // Store a new order
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_number' => 'required|unique:orders,order_number',
            'customer_id' => 'required|exists:users,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'status' => 'required|string|max:50',
            'total_amount' => 'required|numeric|min:0',
            'payment_status' => 'required|string|max:50',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
            'notes' => 'nullable|string',
        ]);

        Order::create($validated);

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    // Show order details
    public function show(Order $order)
    {
        $order->load(['customer', 'bakery', 'orderItems']);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    // Show form to edit an order
    public function edit(Order $order)
    {
        $order->load(['customer', 'bakery']);

        return Inertia::render('Orders/Edit', [
            'order' => $order,
            'customers' => User::select('id', 'name')->get(),
            'bakeries' => Bakery::select('id', 'name')->get(),
        ]);
    }

    // Update an existing order
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'order_number' => 'required|unique:orders,order_number,' . $order->id,
            'customer_id' => 'required|exists:users,id',
            'bakery_id' => 'required|exists:bakeries,id',
            'status' => 'required|string|max:50',
            'total_amount' => 'required|numeric|min:0',
            'payment_status' => 'required|string|max:50',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }

    // Delete an order
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully.');
    }
}
