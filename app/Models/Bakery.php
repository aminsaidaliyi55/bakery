<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bakery extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'logo',            // string path/url to bakery logo
        'location',        // string address or description
        'longitude',       // decimal longitude
        'latitude',        // decimal latitude
        'monthly_rent_fee',// decimal
        'profit_loss',     // decimal, profit or loss amount
        'owner_id',        // foreign key to users table
        'manager_id',      // foreign key to users table
        'storekeeper_id',  // foreign key to users table
        'dough_mixer_id',  // foreign key to users table
        'baker_id',        // foreign key to users table
        'helper_id',       // foreign key to users table
        'cleaner_id',      // foreign key to users table
        'gatekeeper_id',   // foreign key to users table
    ];

    public function employeeAllowances()
    {
        return $this->hasMany(EmployeeAllowance::class);
    }
     public function employeeExpenses()
        {
            return $this->hasMany(EmployeeExpense::class);
        }
public function rawMaterialTransactions()
{
    return $this->hasMany(RawMaterialTransaction::class);
}

    // User role relations
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function storekeeper(): BelongsTo
    {
        return $this->belongsTo(User::class, 'storekeeper_id');
    }

    public function doughMixer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dough_mixer_id');
    }

    public function baker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'baker_id');
    }

    public function helper(): BelongsTo
    {
        return $this->belongsTo(User::class, 'helper_id');
    }

    public function cleaner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cleaner_id');
    }

    public function gatekeeper(): BelongsTo
    {
        return $this->belongsTo(User::class, 'gatekeeper_id');
    }

    // Collections

    /**
     * Employees related to this bakery
     */
    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    /**
     * Raw materials used by this bakery
     */
    public function rawMaterials(): HasMany
    {
        return $this->hasMany(RawMaterial::class);
    }

    /**
     * Products produced by this bakery
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Pastries under this bakery (if you have a separate pastry model)
     */
    public function pastries(): HasMany
    {
        return $this->hasMany(Pastry::class);
    }

    /**
     * Purchases made by this bakery
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Sales made by this bakery
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    /**
     * Orders associated with this bakery
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Inventory records of this bakery
     */
    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    /**
     * Contracts related to this bakery
     */
    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }

    /**
     * Payroll records of this bakery
     */
    public function payrolls(): HasMany
    {
        return $this->hasMany(Payroll::class);
    }

    /**
     * Attendance records of this bakery
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    /**
     * Notifications related to this bakery (optional)
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }


// In Bakery model
public function getLogoUrlAttribute()
{
    return $this->logo ? asset('storage/' . $this->logo) : null;
}

}
