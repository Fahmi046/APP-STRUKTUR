<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SDM;
use Illuminate\Http\Request;

class SDMController extends Controller
{
    public function store(Request $request)
    {
        $sdm = SDM::create($request->all());
        return response()->json(['message' => 'SDM Berhasil Disimpan', 'data' => $sdm]);
    }
}
