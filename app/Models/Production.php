<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Production extends Model
{
    use HasFactory;

    protected $fillable = [
        'bakery_id',       // link to bakery
        'product_id',      // product or pastry produced
        'quantity',        // amount produced
        'production_date', // date produced
        'employee_id',     // who supervised or produced it
        'status',          // status of production (e.g., completed, pending)
        'notes',           // optional notes
    ];

    /**
     * The bakery where production took place
     */

    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }

    /**
     * The product or pastry produced
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
        // or Pastry::class depending on your naming conventions
    }

    /**
     * The employee who handled the production
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
