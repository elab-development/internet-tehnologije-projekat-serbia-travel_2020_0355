<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Hotel;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hotelOwner = User::where('role', 'hotel_owner')->first();

        if ($hotelOwner) {
            $destinations = Destination::all();

            foreach ($destinations as $destination) {
                Hotel::factory(3)->create([
                    'user_id' => $hotelOwner->id,
                    'destination_id' => $destination->id,
                ]);
            }
        } else {
            echo "Hotel owner user not found. Please make sure you have a hotel_owner user.";
        }
    }
}
