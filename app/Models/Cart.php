<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
    protected $fillable = [
        'user_id',       // The owner of the cart (customer)
        'product_id',    // The product added to the cart
        'quantity',      // Quantity of the product
        'price',         // Price per unit at the time of adding
        'total_price',   // quantity * price, cached for quick access
        'status',        // e.g. 'pending', 'purchased'
    ];

    /**
     * The user who owns the cart.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The product added to the cart.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
