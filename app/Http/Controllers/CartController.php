<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    // List all carts (optionally filtered by user)
    public function index(Request $request)
    {
        // Example: show carts for authenticated user only
        $user = $request->user();

        $carts = Cart::with('product')
            ->where('id', $user->id)
            ->paginate(10);

        return Inertia::render('Carts/Index', [
            'carts' => $carts,
        ]);
    }

    // Show form to add new product to cart
    public function create(Request $request)
    {
        $user = $request->user();

        // List available products to add to cart
        $products = Product::where('status', 'available')->get(['id', 'name', 'price']);

        return Inertia::render('Carts/Create', [
            'products' => $products,
            'userId' => $user->id,
        ]);
    }

    // Store new cart item
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0'],
            'status' => ['nullable', 'string'],
        ]);

        $user = $request->user();

        $totalPrice = $request->quantity * $request->price;

        Cart::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'total_price' => $totalPrice,
            'status' => $request->status ?? 'pending',
        ]);

        return redirect()->route('carts.index')->with('success', 'Product added to cart.');
    }

    // Show cart item detail
    public function show(Cart $cart)
    {
        $cart->load('product', 'user');

        return Inertia::render('Carts/Show', [
            'cart' => $cart,
        ]);
    }

    // Show edit form for a cart item
    public function edit(Cart $cart)
    {
        $products = Product::where('status', 'available')->get(['id', 'name', 'price']);

        return Inertia::render('Carts/Edit', [
            'cart' => $cart,
            'products' => $products,
        ]);
    }

    // Update cart item
    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0'],
            'status' => ['nullable', 'string'],
        ]);

        $totalPrice = $request->quantity * $request->price;

        $cart->update([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'total_price' => $totalPrice,
            'status' => $request->status ?? $cart->status,
        ]);

        return redirect()->route('carts.index')->with('success', 'Cart updated successfully.');
    }

    // Delete a cart item
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return redirect()->route('carts.index')->with('success', 'Cart item deleted.');
    }
}
