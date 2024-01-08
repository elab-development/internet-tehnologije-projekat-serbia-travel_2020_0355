<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{

    public static $wrap = 'hotel';

    public function toArray($request)
    {
        return [
            'id'=> $this->resource->id,
            'start_date'=>$this->resource->start_date,
            'end_date'=>$this->resource->end_date,
            'room_id'=> $this->resource->room_id
        ];
    }
}