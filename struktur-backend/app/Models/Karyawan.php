<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    use HasFactory;

    /**
     * Nama tabel yang digunakan oleh model ini.
     * Secara default Laravel akan mencari tabel 'karyawans',
     * jadi baris ini opsional jika nama tabelnya sudah sesuai.
     */
    protected $table = 'karyawans';

    /**
     * Kolom mana saja yang boleh diisi (Mass Assignment).
     * Pastikan kolom-kolom ini sesuai dengan file migration Anda.
     */
    protected $fillable = ['nama', 'email', 'jabatan', 'divisi', 'status', 'nip', 'avatar'];

    /**
     * Casting tipe data jika diperlukan.
     * Misalnya memastikan status selalu terbaca string atau tanggal sebagai datetime.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
