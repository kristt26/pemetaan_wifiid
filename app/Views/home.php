<!DOCTYPE html>
<html lang="en" ng-app="apps">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="<?= base_url() ?>assets/css/login.css">
    <!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->
    <!-- Include the above in your HEAD tag -->

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>
    <style type="text/css">
        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }

        #info {
            display: table;
            position: relative;
            margin: 0px auto;
            word-wrap: anywhere;
            white-space: pre-wrap;
            padding: 10px;
            border: none;
            border-radius: 3px;
            font-size: 12px;
            text-align: center;
            color: #222;
            background: #fff;
        }
    </style>
</head>

<body ng-controller="registerController">
    <div class="main" ng-show="map==false">
        <div class="container">
            <center>
                <div class="middle">
                    <div id="login" style="padding: 0px 0px !important;">
                        <img src="<?= base_url() ?>assets/assets/img/logo.png" width="70%" alt="">
                        <form ng-submit="next('biodata')" style="width: 346px !important">
                            <fieldset class="clearfix" ng-show="status=='biodata'">
                                <p><span class="fa fa-phone-square"></span><input type="text" Placeholder="Nomor Pelanggan" ng-model="model.nomor_pelanggan" style="width: 294px !important;"></p> <!-- JS because of IE support; better: placeholder="Username" -->
                                <p><span class="fa fa-user"></span><input type="text" Placeholder="Nama Pelanggan" ng-model="model.nama" style="width: 294px !important;"></p> <!-- JS because of IE support; better: placeholder="Username" -->

                                <p>
                                    <span class="fa fa-map-marker" ng-click="tampilMap()"></span>
                                    <textarea style="width: 294px !important;" Placeholder="Alamat Pelanggan" ng-model="model.alamat">Alamat Pelanggan</textarea>
                                </p>

                                <p><span class="fa fa-mobile"></span><input type="text" Placeholder="Nomor yang bisa dihubungi" ng-model="model.kontak" style="width: 294px !important;"></p> <!-- JS because of IE support; better: placeholder="Username" -->
                                <div>
                                    <span style="width:48%; text-align:left;  display: inline-block;"></span>
                                    <span style="width:50%; text-align:right;  display: inline-block;" ng-show="status=='biodata'"><input type="submit" value="Next"></span>
                                    <button ng-if="status == 'keluhan' && !hasil" type="button" class="btn btn-info" ng-click="check('Ya')">Ya</button>
                                    <button ng-if="status == 'keluhan' && !hasil" type="button" class="btn btn-warning" ng-click="check('Tidak')">Tidak</button>
                                    <button ng-if="status == 'keluhan' && hasil && hasil.id" type="submit" class="btn btn-primary">Simpan</button>
                                    <button ng-if="status == 'keluhan' && hasil" type="button" class="btn btn-secondary" ng-click="mulai()">Ulang</button>
                                </div>
                            </fieldset>
                        </form>
                        <form ng-submit="next('biodata')" style="width: 100% !important">
                            <fieldset class="clearfix" ng-show="status=='keluhan'">
                                <h3 class="modal-title text-white">Silahkan jawab pertanyaan berikut!</h3>
                                <div ng-show="status == 'keluhan' && !hasil" class="alert alert-primary" role="alert" style="font-size: 20px;">Apakah Terjadi {{pertanyaan.gejala}}</div>
                                <div ng-show="status == 'keluhan' && hasil" class="alert alert-warning" role="alert" style="font-size: 20px;">Permasalahan: <br>{{hasil.kerusakan}}</div>
                                <div>
                                    <span style="width:48%; text-align:left;  display: inline-block;"></span>
                                    <button ng-if="status == 'keluhan' && !hasil" type="button" class="btn btn-info" ng-click="check('Ya')">Ya</button>
                                    <button ng-if="status == 'keluhan' && !hasil" type="button" class="btn btn-warning" ng-click="check('Tidak')">Tidak</button>
                                    <button ng-if="status == 'keluhan' && hasil && hasil.id" type="button" ng-click="save()" class="btn btn-primary">Simpan</button>
                                    <button ng-if="status == 'keluhan' && hasil" type="button" class="btn btn-secondary" ng-click="mulai()">Ulang</button>
                                </div>
                            </fieldset>
                        </form>
                        <div class="clearfix"></div>

                    </div>
                </div>
            </center>
        </div>
    </div>
    <div ng-show="map==true">
        <div id="map"></div>
        <pre id="info"></pre>
    </div>
    <script src="<?= base_url() ?>/assets/js/jquery/jquery.min.js"></script>
    <script src="<?= base_url() ?>/libs/angular/angular.min.js"></script>
    <script src="<?= base_url() ?>/js/services/helper.services.js"></script>
    <script src="<?= base_url() ?>/js/services/admin.services.js"></script>
    <script src="<?= base_url() ?>/js/services/auth.services.js"></script>
    <script src="<?= base_url() ?>/js/services/pesan.services.js"></script>
    <script src="<?= base_url() ?>/libs/loading/dist/loadingoverlay.min.js"></script>
    <script src="<?= base_url() ?>/libs/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

    <script>
        angular.module('apps', ['message.service', 'helper.service', 'admin.service', 'auth.service'])
            .controller("registerController", registerController);

        function registerController($scope, $http, pesan, helperServices, keluhanServices) {
            $scope.model = {};
            $scope.map = false;
            $scope.status = 'biodata';
            $scope.hasil = undefined;
            mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3R0MjYiLCJhIjoiY2txcWt6dHgyMTcxMzMwc3RydGFzYnM1cyJ9.FJYE8uVi-eVl_mH_DLLEmw';
            const map = new mapboxgl.Map({
                container: 'map', // container id
                // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [140.7051989, -2.5570135], // starting position
                zoom: 12 // starting zoom
            });
            map.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    // When active the map will receive updates to the device's location as it changes.
                    trackUserLocation: true,
                    // Draw an arrow next to the location dot to indicate which direction the device is heading.
                    showUserHeading: true
                })
            );
            map.on('click', (e) => {
                document.getElementById('info').innerHTML =
                    // `e.point` is the x, y coordinates of the `mousemove` event
                    // relative to the top-left corner of the map.
                    JSON.stringify(e.point) +
                    '<br />' +
                    // `e.lngLat` is the longitude, latitude geographical position of the event.
                    JSON.stringify(e.lngLat.wrap());
                $scope.$applyAsync(x => {
                    $scope.map = false;
                    $scope.model.lat = e.lngLat.lat;
                    $scope.model.long = e.lngLat.lng;
                    var setUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + $scope.model.long + ',' + $scope.model.lat + '.json?access_token=' + mapboxgl.accessToken;
                    console.log(setUrl);
                    $http({
                        method: 'get',
                        url: setUrl,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        $scope.model.alamat = res.data.features[0].place_name;
                    }, err => {

                    });
                })
            });

            $scope.next = (param) => {
                $.LoadingOverlay('show');
                if (param == 'biodata') $scope.status = 'keluhan';
                keluhanServices.get().then(res => {
                    $scope.datas = res;
                    console.log(res);
                    $scope.hasil = undefined;
                    setTimeout(() => {
                        $scope.$applyAsync(x => {
                            $scope.setData = angular.copy($scope.datas)
                            $scope.pertanyaan = angular.copy($scope.setData.pengetahuan[0]);
                            console.log($scope.pertanyaan);
                        })
                        $.LoadingOverlay('hide');
                    }, 200);
                })
            }
            $scope.check = (param) => {
                $.LoadingOverlay('show');
                if (param == 'Ya') {
                    var ya = $scope.pertanyaan.ya.charAt(0);
                    if (ya == 'G') {
                        var gejala = $scope.setData.gejala.find(x => x.kode_gejala == $scope.pertanyaan.ya);
                        var index = $scope.setData.pengetahuan.indexOf($scope.pertanyaan);
                        $scope.setData.pengetahuan.splice(index, 1);
                        $scope.pertanyaan = angular.copy($scope.setData.pengetahuan.find(x => x.gejala_id == gejala.id));
                    } else {
                        $scope.hasil = $scope.setData.kerusakan.find(x => x.kode_kerusakan == $scope.pertanyaan.ya);
                    }
                } else {
                    var tidak = $scope.pertanyaan.tidak.charAt(0);
                    if (tidak == 'G') {
                        var gejala = $scope.setData.gejala.find(x => x.kode_gejala == $scope.pertanyaan.tidak);
                        var index = $scope.setData.pengetahuan.indexOf($scope.pertanyaan);
                        $scope.setData.pengetahuan.splice(index, 1);
                        $scope.pertanyaan = angular.copy($scope.setData.pengetahuan.find(x => x.gejala_id == gejala.id));
                    } else {
                        $scope.hasil = {};
                        $scope.hasil.kerusakan = "Hasil tidak ditermukan";
                    }
                }
                $.LoadingOverlay('hide');
            }

            $scope.mulai = () => {
                $scope.hasil = undefined;
                $.LoadingOverlay('show');
                setTimeout(() => {
                    $scope.setData = angular.copy($scope.datas)
                    $scope.pertanyaan = angular.copy($scope.setData.pengetahuan[0]);
                    $.LoadingOverlay('hide');
                }, 200);
            }

            $scope.tampilMap = () => {
                $scope.map = true;
            };
            $scope.save = () => {
                pesan.dialog('Yakin ingin menyimpan hasil?', "Ya", "Tidak", "info").then(x => {
                    $.LoadingOverlay('show');
                    $scope.model.kerusakan = $scope.hasil.kerusakan;
                    $scope.model.kerusakan_id = $scope.hasil.id;
                    keluhanServices.post($scope.model).then(res => {
                        $scope.status = 'biodata';
                        $scope.model = {};
                        $scope.gejala = {};
                        $scope.hasil = undefined;
                        pesan.info("Kode Boking anda: " + res.nomor);
                        $.LoadingOverlay('hide');
                    })
                })
            }
        }
    </script>
</body>

</html>