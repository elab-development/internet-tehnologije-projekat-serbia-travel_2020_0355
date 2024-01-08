<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'stars',
        'destination_id'
    ];

    public function destination() {
        return $this->belongsTo(Destination::class, 'destination_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
