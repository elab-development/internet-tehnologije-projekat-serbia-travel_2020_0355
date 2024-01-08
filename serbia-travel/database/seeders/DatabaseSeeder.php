<?php

namespace Database\Seeders;

use App\Models\Hotel;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();

        // Hotel::factory(10)->create();

        $destinationId = 4;

        Hotel::factory(10)->create([
            'destination_id' => $destinationId,
        ]);
    }
}
