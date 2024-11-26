<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Picture extends Model
{
    use HasFactory;
    public function getFilePathAttribute(): string
    {
        return "/{$this->threadItem->thread->user_id}/{$this->threadItem->id}/{$this->id}.{$this->file_extension}";
    }

    public function getFileFromS3(): string
    {
        /** @var \Illuminate\Filesystem\FilesystemManager $disk */
        $disk = Storage::disk('pictures');
        return $disk->url($this->file_path);
    }

    public function getS3UrlAttribute()
    {
        return $this->getFileFromS3();
    }
}
