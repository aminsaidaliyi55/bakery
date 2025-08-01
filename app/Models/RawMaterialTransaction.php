<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RawMaterialTransaction extends Model
{
    protected $fillable = [
        'bakery_id',
        'raw_material_id',
        'user_id',
        'role',
        'quantity',
        'measurement_unit',
        'transaction_type',
    ];

    public function bakery()
    {
        return $this->belongsTo(Bakery::class);
    }

    public function rawMaterial()
    {
        return $this->belongsTo(RawMaterial::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
