<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DestinationResource extends JsonResource
{

    public static $wrap = 'destination';

    public function toArray($request)
    {
        return [
            'id'=> $this->resource->id,
            'name'=>$this->resource->name,
            'country'=> $this->resource->country,
            'hotels'=>$this->resource->hotels
        ];
    }
}
