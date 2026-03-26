<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $table = 'materials';

    protected $fillable = [
        'nama',
        'kategori',
        'merk',
        'tipe',
        'harga',
        'satuan',
        'stok',
        'min_stok',
        'vendor',
        'image',
        'status'
    ];
}
