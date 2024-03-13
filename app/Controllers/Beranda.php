<?php

namespace App\Controllers;

use App\Models\KeluhanModel;
use App\Models\WifiidModel;

class Beranda extends BaseController
{
    public function index(): string
    {
        return view('beranda');
    }

    public function read(): object
    {
        try {
            $wifi = new WifiidModel();
            $data = $wifi->findAll();
            return $this->respond($data);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }
}
