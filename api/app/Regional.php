<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    public function clinics()
    {
        return $this->hasMany('App\Clinic');
    }
}
