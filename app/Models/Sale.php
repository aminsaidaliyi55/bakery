<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'bakery_id',        // relates sale to a bakery
        'product_id',       // relates sale to a product/pastry
        'quantity',         // quantity sold
        'unit_price',       // price per unit at sale time
        'total_price',      // total amount (quantity * unit_price)
        'sale_date',        // date of sale
        'customer_name',    // optional customer info
        'customer_contact', // optional customer contact info
        'payment_method',   // cash, card, mobile payment etc.
        'notes',            // any extra notes
    ];

    /**
     * The bakery where the sale happened
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }

    /**
     * The product or pastry that was sold
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);  // or Pastry::class if sales is only for pastries
    }
}
