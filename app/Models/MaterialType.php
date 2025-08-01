<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaterialType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',        // e.g., Flour, Sugar, Yeast
        'description', // optional description
    ];

    /**
     * Raw materials that belong to this material type.
     */
    public function rawMaterials(): HasMany
    {
        return $this->hasMany(RawMaterial::class);
    }
}
