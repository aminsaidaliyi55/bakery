<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pastry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'sku',
        'image',           // path/url for pastry image
        'stock_quantity',
        'category_id',     // FK to PastryCategory
        'bakery_id',       // FK to Bakery
        'status',          // e.g. available, out-of-stock
    ];

    /**
     * Pastry category relation
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(PastryCategory::class, 'category_id');
    }

    /**
     * Bakery relation
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class, 'bakery_id');
    }
}
