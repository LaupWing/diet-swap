<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'calories',
        'protein',
        'carbs',
        'fats',
        'sugar',
        'fiber',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
