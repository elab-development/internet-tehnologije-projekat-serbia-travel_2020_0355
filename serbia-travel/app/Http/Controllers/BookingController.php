<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();
        return BookingResource::collection($bookings);
    }

    public function show(Booking $booking) {
        return new BookingResource($booking);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $booking = new Booking();
        $booking->start_date = $validatedData['start_date'];
        $booking->end_date = $validatedData['end_date'];
        $booking->room_id = $validatedData['room_id'];

        $booking->save();

        return new BookingResource($booking);
    }

    public function update(Request $request, Booking $booking)
    {
        $validatedData = $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $booking->start_date = $validatedData['start_date'];
        $booking->end_date = $validatedData['end_date'];
        $booking->room_id = $validatedData['room_id'];

        $booking->save();

        return new BookingResource($booking);
    }

    public function destroy(Room $room)
    {
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully']);
    }
}