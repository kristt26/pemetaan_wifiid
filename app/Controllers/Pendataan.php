<?php

namespace App\Controllers;

use App\Models\KeluhanModel;
use App\Models\WifiidModel;

class Pendataan extends BaseController
{
    protected $wifi;
    public function __construct() {
        $this->wifi = new WifiidModel();
    }
    public function index(): string
    {
        return view('pendataan');
    }

    public function read(): object
    {
        try {
            $data = $this->wifi->findAll();
            return $this->respond($data);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    public function post(): object
    {
        $data = $this->request->getJSON();
        try {
            $this->wifi->insert($data);
            $data->id = $this->wifi->getInsertID();
            return $this->respondCreated($data);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    public function put(): object
    {
        $data = $this->request->getJSON();
        try {
            $this->wifi->update($data->id, $data);
            return $this->respondUpdated($data);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    public function delete($id = null): object
    {
        try {
            $this->wifi->delete($id);
            return $this->respondDeleted(true);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }
}
