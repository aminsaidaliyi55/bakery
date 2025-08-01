<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',      // foreign key to employees table
        'date',             // date of attendance
        'status',           // e.g. 'present', 'absent', 'leave', etc.
        'check_in_time',    // nullable time
        'check_out_time',   // nullable time
        'notes',            // nullable string for any remarks
    ];

    /**
     * The employee this attendance record belongs to
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
