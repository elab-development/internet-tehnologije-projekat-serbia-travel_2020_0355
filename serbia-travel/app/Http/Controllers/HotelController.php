<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\HotelResource;
use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index() {
        $hotels = Hotel::all();
        return HotelResource::collection($hotels);
    }

    public function show(Hotel $hotel) {
        return new HotelResource($hotel);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'stars' => 'required|numeric|between:1,5',
            'destination_id' => 'required|exists:destinations,id',
        ]);

        $hotel = new Hotel();
        $hotel->name = $validatedData['name'];
        $hotel->stars = $validatedData['stars'];
        $hotel->destination_id = $validatedData['destination_id'];

        $hotel->save();

        return new HotelResource($hotel);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'stars' => 'required|numeric|between:1,5',
            'destination_id' => 'required|exists:destinations,id',
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