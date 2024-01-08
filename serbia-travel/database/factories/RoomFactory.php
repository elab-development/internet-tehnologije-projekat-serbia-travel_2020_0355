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
            'room_number' => $this->faker->unique()->numberBetween(1, 100),
            'number_of_beds' => 3,
            'hotel_id' => function () {
                return Hotel::factory()->create()->id;
            },
        ];
    }
}
