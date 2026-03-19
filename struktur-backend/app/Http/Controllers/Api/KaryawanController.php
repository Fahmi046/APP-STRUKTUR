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

    public function update(Request $request, $id)
    {
        // 1. Cari datanya
        $karyawan = Karyawan::find($id);

        // 2. Jika tidak ketemu, kasih tau React
        if (!$karyawan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        // 3. Update datanya (Pastikan field sesuai dengan database)
        $karyawan->update($request->all());

        // 4. Kirim respon balik ke React
        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $karyawan
        ], 200);
    }

    public function destroy($id)
    {
        try {
            $karyawan = Karyawan::findOrFail($id); // Pakai findOrFail supaya otomatis error 404 kalau ID tidak ada
            $karyawan->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            // Ini akan menangkap pesan error asli kalau gagal
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
