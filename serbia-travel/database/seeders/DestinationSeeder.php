<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Destination::truncate();

        $destinations = [
            ['name' => 'Pozarevac', 'country_id' => 1],
            ['name' => 'Herceg Novi', 'country_id' => 2],
            ['name' => 'Novi Sad', 'country_id' => 1]
        ];

        Destination::insert($destinations);
    }
}
