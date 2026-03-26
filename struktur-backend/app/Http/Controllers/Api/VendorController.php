<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Vendor::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'email' => 'nullable|email|unique:vendors',
            'kontak' => 'nullable',
            'npwp' => 'nullable|unique:vendors',
            'alamat' => 'nullable'
        ]);

        $vendor = Vendor::create($request->all());
        return response()->json($vendor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $vendor = Vendor::find($id);
        if (!$vendor) return response()->json(['message' => 'Data tidak ditemukan'], 404);
        return response()->json($vendor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => 'sometimes|required',
            'email' => 'nullable|email|unique:vendors,email,' . $id,
            'kontak' => 'nullable',
            'npwp' => 'nullable|unique:vendors,npwp,' . $id,
            'alamat' => 'nullable'
        ]);

        $vendor->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $vendor
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $vendor = Vendor::findOrFail($id);
            $vendor->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
