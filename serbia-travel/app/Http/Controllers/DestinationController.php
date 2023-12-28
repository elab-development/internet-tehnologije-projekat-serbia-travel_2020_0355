<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\DestinationResource;
use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index() {
        $destinations = Destination::all();
        return DestinationResource::collection($destinations);
    }

    public function show(Destination $destination) {
        return new DestinationResource($destination);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'country_id' => 'required|exists:countries,id',
        ]);

        $destination = new Destination();
        $destination->name = $validatedData['name'];
        $destination->country_id = $validatedData['country_id'];

        $destination->save();

        return new DestinationResource($destination);
    }
}