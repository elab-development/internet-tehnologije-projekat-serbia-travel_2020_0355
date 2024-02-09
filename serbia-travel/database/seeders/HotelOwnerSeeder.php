<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HotelOwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Hotel Owner',
            'email' => 'owner@gmail.com',
            'password' => bcrypt('owner12345'),
            'role' => 'hotel_owner',
        ]);
    }
}
