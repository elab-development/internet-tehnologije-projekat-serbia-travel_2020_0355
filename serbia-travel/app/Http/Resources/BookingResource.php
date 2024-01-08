<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{

    public static $wrap = 'hotel';

    public function toArray($request)
    {
        return [
            'id'=> $this->resource->id,
            'start_date'=>$this->resource->name,
            'end_date'=>$this->resource->stars,
            'room'=> $this->resource->room
        ];
    }
}