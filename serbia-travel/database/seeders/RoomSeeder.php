<?php

namespace Database\Seeders;

use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run()
    {
        $hotels = Hotel::all();

        foreach ($hotels as $hotel) {
            Room::factory(3)->create([
                'hotel_id' => $hotel->id,
            ]);
        }
    }
}
