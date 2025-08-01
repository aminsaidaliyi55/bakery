<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',     // link to employee
        'contract_type',   // e.g., full-time, part-time, temporary
        'start_date',
        'end_date',
        'salary',
        'terms',           // text or JSON field for contract terms
        'status',          // active, expired, terminated
    ];

    /**
     * The employee this contract belongs to.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
