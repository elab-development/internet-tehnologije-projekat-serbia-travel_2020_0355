<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'number_of_beds',
        'hotel_id'
    ];

    public function destination() {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }
}
