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
