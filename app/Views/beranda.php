<?= $this->extend('layout') ?>
<?= $this->section('content') ?>
<div ng-controller="dashboardController">
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>
    <div class="text-center">
        <img src="assets/assets/img/logo.png" alt="" width="17%">
        <h1>Pemetaan Laporan Kerusakan</h1>
        <hr style="margin-top: -17px !important;">
    </div>
    <div id="map"></div>
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">
    <style>
        #map {
            position: absolute;
            top: 240px;
            bottom: 10px;
            width: 86%;
        }

        .mapboxgl-popup {
            max-width: 500px;
            min-width: 220px;
        }
        .mapboxgl-popup h4{
            font-size: 16px;
        }

        .mapboxgl-popup p{
            font-size: 14px;
        }

        .mapboxgl-popup-content {
            text-align: center;
            font-family: 'Open Sans', sans-serif;
        }
    </style>
</div>

<?= $this->endSection() ?>