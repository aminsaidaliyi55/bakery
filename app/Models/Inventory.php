<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'bakery_id',
        'raw_material_id',
        'product_id',
        'quantity',
        'unit',        // e.g., kg, liters, pieces
        'stock_in_date',
        'stock_out_date',
        'status',      // e.g., available, reserved, sold, damaged
    ];

    /**
     * The bakery this inventory belongs to.
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }

    /**
     * The raw material related to this inventory record (if applicable).
     */
    public function rawMaterial(): BelongsTo
    {
        return $this->belongsTo(RawMaterial::class);
    }

    /**
     * The product related to this inventory record (if applicable).
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
