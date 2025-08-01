<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',      // foreign key to Employee
        'pay_period_start', // start date of the pay period
        'pay_period_end',   // end date of the pay period
        'basic_salary',     // base salary amount
        'allowances',       // any allowances (bonuses, etc.)
        'deductions',       // deductions (taxes, etc.)
        'net_pay',          // final amount paid
        'payment_date',     // date payment was made
        'notes',            // optional notes or comments
    ];

    /**
     * The employee this payroll belongs to
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}
