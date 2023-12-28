<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{

    public static $wrap = 'hotel';

    public function toArray($request)
    {
        return [
            'id'=> $this->resource->id,
            'name'=>$this->resource->name,
            'destination'=> $this->resource->destination
        ];
    }
}