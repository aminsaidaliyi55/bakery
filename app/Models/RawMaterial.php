<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RawMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'material_type_id',  // Foreign key to material_types table
        'bakery_id',         // Foreign key to bakeries table
        'unit',              // Unit of measurement, e.g., kg, liters
        'stock_quantity',    // Current stock quantity
        'reorder_level',     // Quantity at which to reorder
        'price_per_unit',    // Price per unit
    ];

    /**
     * Material type this raw material belongs to.
     */
    public function materialType(): BelongsTo
    {
        return $this->belongsTo(MaterialType::class);
    }

    /**
     * Bakery that owns this raw material.
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }

    /**
     * Purchases associated with this raw material.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }
}
