<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\Hotel;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::all();
        return RoomResource::collection($rooms);
    }

    public function show(Room $room) {
        return new RoomResource($room);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'room_number' => 'required|numeric|between:100,999',
            'number_of_beds' => 'required|numeric|between:1,7',
            'hotel_id' => 'required|exists:hotels,id',
        ]);

        $room = new Room();
        $room->room_number = $validatedData['room_number'];
        $room->number_of_beds = $validatedData['number_of_beds'];
        $room->hotel_id = $validatedData['hotel_id'];

        $room->save();

        return new RoomResource($room);
    }

    public function update(Request $request, Room $room)
    {
        $validatedData = $request->validate([
            'room_number' => 'required|numeric|between:100,999',
            'number_of_beds' => 'required|numeric|between:1,7',
            'hotel_id' => 'required|exists:hotels,id',
        ]);

        $room->room_number = $validatedData['room_number'];
        $room->number_of_beds = $validatedData['number_of_beds'];
        $room->hotel_id = $validatedData['hotel_id'];

        $room->save();

        return new RoomResource($room);
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(['message' => 'Room deleted successfully']);
    }
}