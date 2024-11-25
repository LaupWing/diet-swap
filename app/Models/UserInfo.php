<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'firstname',
        'lastname',
        'weight',
        'height',
        'gender',
        'date_of_birth',
        'ideal_weight',
        'ideal_weight_timespan_in_months',
        'weight_unit',
        'height_unit',
        'activity_level',
        'allergies',
        'cuisine',
        'dietary',
        'special_notes',
        'timezone',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
