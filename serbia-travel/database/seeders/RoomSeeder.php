<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Room::factory(10)->create();

        $beds = 3;

        for ($hotelId = 13; $hotelId <= 22; $hotelId++) {
            Room::factory()->count(1)->create([
                'number_of_beds' => $beds,
                'hotel_id' => $hotelId,
            ]);
        }
    }
}
