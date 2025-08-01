<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PastryCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'bakery_id',  // foreign key to bakery
    ];

    /**
     * Pastries under this category
     */
    public function pastries(): HasMany
    {
        return $this->hasMany(Pastry::class, 'category_id');
    }

    /**
     * The bakery this category belongs to
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }
}
