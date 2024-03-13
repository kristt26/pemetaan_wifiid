<?php

namespace App\Controllers;

use App\Models\KeluhanModel;

class Beranda extends BaseController
{
    public function index(): string
    {
        return view('beranda');
    }

    // public function read(): object
    // {
    //     $keluhan = new KeluhanModel();
    //     $data = $keluhan
    //     ->select("keluhan.*, kerusakan.kerusakan, pelanggan.lat, pelanggan.long, pelanggan.nama, pelanggan.alamat, pelanggan.kontak")
    //     ->join('kerusakan', 'kerusakan.id=keluhan.kerusakan_id')
    //     ->join('pelanggan', 'pelanggan.id=keluhan.pelanggan_id')
    //     ->findAll();
    //     return $this->respond($data);
    // }


}
