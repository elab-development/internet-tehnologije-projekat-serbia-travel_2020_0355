<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        return Country::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'country_code' => 'required',
        ]);

        $country = Country::create($request->all());

        return response()->json($country, 201);
    }

    public function update(Request $request, Country $country)
    {
        $request->validate([
            'name' => 'required',
            'country_code' => 'required',
        ]);

        $country->update($request->all());

        return response()->json($country, 200);
    }

    public function destroy(Country $country)
    {
        $country->delete();

        return response()->json(null, 204);
    }
}
