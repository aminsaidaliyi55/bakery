<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',       // unique order identifier
        'customer_id',        // customer who placed the order
        'bakery_id',          // bakery fulfilling the order
        'status',             // order status (pending, completed, canceled, etc.)
        'total_amount',       // total price of the order
        'payment_status',     // payment status (paid, unpaid, refunded, etc.)
        'order_date',         // date/time of the order
        'delivery_date',      // expected or actual delivery date
        'notes',              // optional notes for the order
    ];

    /**
     * The customer who placed the order.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * The bakery fulfilling the order.
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }

    /**
     * The order items (products in the order).
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
