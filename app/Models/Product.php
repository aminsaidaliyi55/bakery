<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',      // e.g., 'bakery', 'pastry'
        'price',
        'description',
        'image_path',
    ];

    /**
     * A product may be produced multiple times
     */
    public function productions(): HasMany
    {
        return $this->hasMany(Production::class);
    }

    /**
     * Optional: If each product belongs to a category table instead of simple string
     */
    public function categoryRelation(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Optional: If a product is used in multiple bakeries
     */
    public function bakeries(): BelongsToMany
    {
        return $this->belongsToMany(Bakery::class, '
        ')
            ->withTimestamps();
    }
}
