<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class PastryCategory extends Model
{
    use HasFactory;

    public $incrementing = false;         // UUID support
    protected $keyType = 'string';        // UUID type

   protected $fillable = [
       'name',
       'description',
       'bakery_id',
       'unit',
       'image_path',
       'is_active',
   ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

   // Optional: Auto-generate UUID if you use 'uuid' field
   protected static function boot()
   {
       parent::boot();

       static::creating(function ($model) {
           $model->uuid = (string) \Illuminate\Support\Str::uuid();
       });
   }

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
