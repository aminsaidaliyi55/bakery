<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'raw_material_id',
        'quantity',
        'price_per_unit',
        'total_price',
        'purchase_date',
        'status', // e.g., pending, completed, canceled
        'notes',
        'bakery_id',
    ];

    /**
     * Supplier related to the purchase
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Raw material purchased
     */
    public function rawMaterial(): BelongsTo
    {
        return $this->belongsTo(RawMaterial::class);
    }

    /**
     * Bakery this purchase belongs to
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }
}
