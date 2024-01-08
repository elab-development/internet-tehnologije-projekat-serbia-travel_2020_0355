<?php

namespace Database\Factories;

use App\Models\Hotel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'room_number' => $this->faker->numerify('###'),
            'number_of_beds' => $this->faker->numberBetween(1, 4),
            'hotel_id' => function () {
                return Hotel::inRandomOrder()->first()->id;
            },
        ];
    }
}
