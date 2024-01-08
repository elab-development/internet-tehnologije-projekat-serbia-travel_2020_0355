<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf;
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

        $existingBooking = Booking::where('room_id', $validatedData['room_id'])
        ->where(function ($query) use ($validatedData) {
            $query->whereBetween('start_date', [$validatedData['start_date'], $validatedData['end_date']])
                ->orWhereBetween('end_date', [$validatedData['start_date'], $validatedData['end_date']])
                ->orWhere(function ($query) use ($validatedData) {
                    $query->where('start_date', '<', $validatedData['start_date'])
                        ->where('end_date', '>', $validatedData['end_date']);
                });
        })
        ->first();

    if ($existingBooking) {
        return response()->json(['error' => 'Booking for the same room in the given time period already exists.'], 422);
    }

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

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully']);
    }

    public function exportToPDF(Request $request, $hotelId)
    {
        $bookings = Booking::whereHas('room', function ($query) use ($hotelId) {
            $query->where('hotel_id', $hotelId);
        })->with(['room.hotel'])->get();

        $pdf = PDF::loadView('booking.pdf', ['bookings' => $bookings]);

        return $pdf->download('bookings.pdf');
    }
}