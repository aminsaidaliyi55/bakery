<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',     // Reference to the user account
        'bakery_id',   // The bakery where the employee works
        'role',        // Role/job title (e.g., baker, cleaner, etc.)
        'salary',      // Monthly salary
        'hired_at',    // Hiring date
        'status',      // Employment status: active, terminated, on leave etc.
        'notes',       // Any extra notes or remarks
    ];

    /**
     * The user account linked to this employee
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The bakery this employee works at
     */
    public function bakery(): BelongsTo
    {
        return $this->belongsTo(Bakery::class);
    }
}
