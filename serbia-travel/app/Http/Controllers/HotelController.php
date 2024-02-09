<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\HotelResource;
use App\Models\Booking;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class HotelController extends Controller
{
    public function index(Request $request)
    {
        $destinationName = $request->input('destination_name');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $numberOfBeds = $request->input('number_of_beds');
        $numberOfStars = $request->input('number_of_stars');

        if (empty($destinationName) || empty($startDate) || empty($endDate) || empty($numberOfBeds)) {
            return response()->json(['message' => 'All parameters are required'], 400);
        }

        $destination = Destination::where('name', $destinationName)->first();

        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }

        $hotelsQuery = Hotel::where('destination_id', $destination->id);

        if (!empty($numberOfStars)) {
            $hotelsQuery->where('stars', $numberOfStars);
        }

        $hotels = $hotelsQuery->get();

        $filteredHotels = $hotels->filter(function ($hotel) use ($startDate, $endDate, $numberOfBeds) {
            $availableRooms = Room::where('hotel_id', $hotel->id)
                ->where('number_of_beds', '=', $numberOfBeds)
                ->doesntHave('bookings', 'and', function ($query) use ($startDate, $endDate) {
                    $query->where('end_date', '>', $startDate)
                        ->where('start_date', '<', $endDate);
                })
                ->get();

            return $availableRooms->isNotEmpty();
        });

        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $paginatedHotels = new LengthAwarePaginator(
            $filteredHotels->forPage($page, $perPage),
            $filteredHotels->count(),
            $perPage,
            $page
        );

        return HotelResource::collection($paginatedHotels);
    }

    public function show(Hotel $hotel)
    {
        return new HotelResource($hotel);
    }

    public function hotelsByUserId($userId, Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $hotels = Hotel::where('user_id', $userId)->paginate($perPage, ['*'], 'page', $page);

        return HotelResource::collection($hotels);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'stars' => 'required|numeric|between:1,5',
            'destination_id' => 'required|exists:destinations,id',
            'user_id' => 'required|exists:users,id'
        ]);

        $hotel = new Hotel();
        $hotel->name = $validatedData['name'];
        $hotel->stars = $validatedData['stars'];
        $hotel->destination_id = $validatedData['destination_id'];
        $hotel->user_id = $validatedData['user_id'];

        $hotel->save();

        return new HotelResource($hotel);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'stars' => 'required|numeric|between:1,5',
            'destination_id' => 'required|exists:destinations,id'
        ]);

        $hotel->name = $validatedData['name'];
        $hotel->stars = $validatedData['stars'];
        $hotel->destination_id = $validatedData['destination_id'];

        $hotel->save();

        return new HotelResource($hotel);
    }

    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return response()->json(['message' => 'Hotel deleted successfully']);
    }
}