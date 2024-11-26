<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'calories',
        'protein',
        'carbs',
        'fats',
        'sugar',
        'fiber',
        'is_healthy',
        'is_healthy_reason',
        'picture_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function picture(): BelongsTo
    {
        return $this->belongsTo(Picture::class);
    }
}
