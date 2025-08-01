<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',         // user to whom the notification belongs
        'title',           // notification title
        'message',         // notification body/message
        'is_seen',         // boolean flag: 0 = not seen, 1 = seen
        'link',            // optional URL link related to the notification
    ];

    protected $casts = [
        'is_seen' => 'boolean',
    ];

    /**
     * The user that the notification belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
