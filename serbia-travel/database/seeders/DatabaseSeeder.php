<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Hotel;
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
        // \App\Models\User::factory(10)->create();


        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // \App\Models\Country::create([
        //     'name'=>"Serbia"
        // ]);
        // \App\Models\Country::create([
        //     'name'=>"Montenegro"
        // ]);
        // \App\Models\Country::create([
        //     'name'=>"Greece"
        // ]);
        // \App\Models\Country::create([
        //     'name'=>"Italy"
        // ]);

        Hotel::factory(10)->create();
    }
}
