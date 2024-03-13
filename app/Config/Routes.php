<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->group('beranda', static function($routes){
    $routes->get('/', 'Beranda::index');
    $routes->get('read', 'Beranda::read');
});

$routes->group('pendataan', static function($routes){
    $routes->get('/', 'Pendataan::index');
    $routes->get('read', 'Pendataan::read');
    $routes->post('post', 'Pendataan::post');
    $routes->put('put', 'Pendataan::put');
    $routes->delete('delete/(:any)', 'Pendataan::delete/$1');
});
