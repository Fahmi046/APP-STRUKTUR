<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'nama',
        'email',
        'telepon',
        'sumber',
        'status',
        'marketing_pic',
        'ktp',
        'npwp',
        'alamat',
        'verified',
        'jabatan',
        'perusahaan',
        'avatar'
    ];

    protected $casts = [
        'verified' => 'boolean',
    ];
}
