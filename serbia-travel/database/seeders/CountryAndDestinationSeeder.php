<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Destination;
use Illuminate\Database\Seeder;

class CountryAndDestinationSeeder extends Seeder
{
    public function run()
    {
        $countries = Country::factory(3)->create();

        foreach ($countries as $country) {
            Destination::factory(2)->create(['country_id' => $country->id]);
        }
    }
}
