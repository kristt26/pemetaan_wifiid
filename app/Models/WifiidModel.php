<?php

namespace App\Models;

use CodeIgniter\Model;

class WifiidModel extends Model
{
    protected $table            = 'wifiid';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['nama', 'kode', 'lokasi', 'lat', 'long', 'status', 'tanggal'];
}
