<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    // Allow mass assignment for these fields
    protected $fillable = [
        'key',    // setting key (e.g., 'site_name', 'timezone')
        'value',  // setting value
        'type',   // optional: data type of the value (string, boolean, integer, json, etc.)
        'description', // optional: description of the setting
    ];

    // Cast 'value' to appropriate types if needed, for example json or boolean
    protected $casts = [
        'value' => 'string',
    ];
}
