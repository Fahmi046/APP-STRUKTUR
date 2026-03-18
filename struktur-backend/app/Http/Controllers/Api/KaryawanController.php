<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Karyawan;
use Illuminate\Http\Request;

class KaryawanController extends Controller
{
    // Ambil Semua Data SDM
    public function index()
    {
        return response()->json(Karyawan::all(), 200);
    }

    // Simpan Data Baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:karyawans',
            'jabatan' => 'required'
        ]);

        $karyawan = Karyawan::create($request->all());
        return response()->json($karyawan, 201);
    }

    // Detail Per Karyawan
    public function show($id)
    {
        $karyawan = Karyawan::find($id);
        if (!$karyawan) return response()->json(['message' => 'Data tidak ditemukan'], 404);
        return response()->json($karyawan);
    }
}
