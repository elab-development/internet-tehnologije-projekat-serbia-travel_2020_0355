<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{

    public static $wrap = 'room';

    public function toArray($request)
    {
        return [
            'id'=> $this->resource->id,
            'room_number'=>$this->resource->room_number,
            'number_of_beds'=>$this->resource->number_of_beds,
            'hotel'=> $this->resource->hotel
        ];
    }
}