<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected $fillable = [
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'regional_id',
        'data_inauguracao',
        'ativa',
    ];
    
    public function regional()
    {
        return $this->belongsTo('App\Regional');
    }

    public function specialties()
    {
        return $this->belongsToMany('App\Specialty');
    }
}
