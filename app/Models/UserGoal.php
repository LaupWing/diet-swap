<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserGoal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'calories',
        'protein',
        'current_bodyfat',
        'goal_bodyfat',
        'meal_plan',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
