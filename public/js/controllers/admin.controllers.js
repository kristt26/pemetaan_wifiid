angular.module('adminctrl', [])
    // Admin
    .controller('dashboardController', dashboardController)
    .controller('kerusakanController', kerusakanController)
    .controller('gejalaController', gejalaController)
    .controller('pengetahuanController', pengetahuanController)
    .controller('keluhanController', keluhanController)
    ;

function dashboardController($scope, dashboardServices) {
    $scope.$emit("SendUp", "Dashboard");
    $scope.datas = {};
    $scope.title = "Dashboard";
    var all = [];
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3R0MjYiLCJhIjoiY2txcWt6dHgyMTcxMzMwc3RydGFzYnM1cyJ9.FJYE8uVi-eVl_mH_DLLEmw';

    dashboardServices.get().then(res => {
        $scope.datas = res;
        $scope.$applyAsync(x => {
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [140.7052499, -2.5565586],
                zoom: 12
            });
            $scope.datas.forEach(param => {
                var item = new mapboxgl.Marker({ color: param.status == '0' ? 'red' :  '' })
                    .setLngLat([Number(param.long), Number(param.lat)])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h4><strong>Nama Wifi: ${param.nama}</strong></h4><p>Lokasi: ${param.lokasi}<br>Status: <strong>${param.status == '1' ? 'Aktif' : 'Tidak Aktif'}</strong></p>`
                            )
                    )
                    .addTo(map);
                all.push(item);
            });
        })
    })
}

function kerusakanController($scope, kerusakanServices, pesan) {
    $scope.$emit("SendUp", "Daftar Kerusakan");
    $scope.datas = {};
    $scope.title = "Dashboard";
    $.LoadingOverlay('show');
    kerusakanServices.get().then(res => {
        $scope.datas = res;
        $.LoadingOverlay('hide');
    })

    $scope.edit = (param) => {
        $scope.model = angular.copy(param);
    }

    $scope.save = () => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak", "info").then(x => {
            $.LoadingOverlay('show');
            if ($scope.model.id) {
                kerusakanServices.put($scope.model).then(res => {
                    $scope.model = {}
                    $.LoadingOverlay('hide');
                })
            } else {
                kerusakanServices.post($scope.model).then(res => {
                    $scope.model = {}
                    $.LoadingOverlay('hide');
                })
            }
        })
    }

    $scope.delete = (param) => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak").then(x => {
            $.LoadingOverlay('show');
            kerusakanServices.deleted(param).then(res => {
                $.LoadingOverlay('hide');
            })
        })
    }
}

function gejalaController($scope, gejalaServices, pesan) {
    $scope.$emit("SendUp", "Daftar Gejala");
    $scope.datas = {};
    $.LoadingOverlay('show');
    gejalaServices.get().then(res => {
        $scope.datas = res;
        $.LoadingOverlay('hide');
    })

    $scope.edit = (param) => {
        $scope.model = angular.copy(param);
    }

    $scope.save = () => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak", "info").then(x => {
            $.LoadingOverlay('show');
            if ($scope.model.id) {
                gejalaServices.put($scope.model).then(res => {
                    $scope.model = {}
                    $.LoadingOverlay('hide');
                })
            } else {
                gejalaServices.post($scope.model).then(res => {
                    $scope.model = {}
                    $.LoadingOverlay('hide');
                })
            }
        })
    }

    $scope.delete = (param) => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak").then(x => {
            $.LoadingOverlay('show');
            gejalaServices.deleted(param).then(res => {
                $.LoadingOverlay('hide');
            })
        })
    }
}

function pengetahuanController($scope, pengetahuanServices, helperServices, pesan) {
    $scope.$emit("SendUp", "Daftar Pengetahuan");
    $scope.datas = {};
    $.LoadingOverlay('show');
    pengetahuanServices.get(helperServices.lastPath).then(res => {
        $scope.datas = res;
        console.log(res);
        $.LoadingOverlay('hide');
    })

    $scope.edit = (param) => {
        $scope.gejala = $scope.datas.gejala.find(x => x.id == param.gejala_id);
        $scope.model = angular.copy(param);
    }

    $scope.save = () => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak", "info").then(x => {
            $.LoadingOverlay('show');
            if ($scope.model.id) {
                pengetahuanServices.put($scope.model).then(res => {
                    $scope.model = {}
                    $scope.gejala = {};
                    $.LoadingOverlay('hide');
                })
            } else {
                pengetahuanServices.post($scope.model).then(res => {
                    $scope.model = {};
                    $scope.gejala = {};
                    $.LoadingOverlay('hide');
                })
            }
        })
    }

    $scope.delete = (param) => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak").then(x => {
            $.LoadingOverlay('show');
            pengetahuanServices.deleted(param).then(res => {
                $.LoadingOverlay('hide');
            })
        })
    }
}

function keluhanController($scope, keluhanServices, helperServices, pesan, $http) {
    $scope.$emit("SendUp", "Keluhan Konsumen");
    $scope.datas = [];
    $scope.model = {};
    $scope.peta = false;
    $scope.add = false;
    var map;
    var marker;
    var direction;
    var current;
    var all = [];
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3R0MjYiLCJhIjoiY2txcWt6dHgyMTcxMzMwc3RydGFzYnM1cyJ9.FJYE8uVi-eVl_mH_DLLEmw';
    $scope.init = () => {
        map = new mapboxgl.Map({
            container: 'map',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [140.7052499, -2.5565586],
            zoom: 12
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
                    $scope.model.lokasi = res.data.features[0].place_name;
                    $scope.peta = false;
                }, err => {

                });
            })
        });
    }

    $.LoadingOverlay('show');
    keluhanServices.get().then(res => {
        $scope.datas = res;
        console.log(res);
        $.LoadingOverlay('hide');
    })

    $scope.kembali = () => {
        $scope.peta = false;
    }

    $scope.showPeta = () => {
        $scope.peta = true;
    }

    $scope.check = (param) => {
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
    }

    $scope.ubah = (param)=>{
        $scope.model = angular.copy(param);
        $scope.model.tanggal = new Date(param.tanggal);
    }

    $scope.save = () => {
        pesan.dialog('Yakin ingin menyimpan hasil?', "Ya", "Tidak", "info").then(x => {
            $.LoadingOverlay('show');
            var item = angular.copy($scope.model);
            item.tanggal = helperServices.dateToString($scope.model.tanggal)
            if($scope.model.id){
                keluhanServices.put(item).then(res => {
                    $scope.model = {};
                    $.LoadingOverlay('hide');
                })
            }else{
                keluhanServices.post(item).then(res => {
                    $scope.model = {};
                    $.LoadingOverlay('hide');
                })
            }
        })
    }

    $scope.delete = (param) => {
        pesan.dialog('Yakin ingin melanjutkan proses?', "Ya", "Tidak").then(x => {
            $.LoadingOverlay('show');
            keluhanServices.deleted(param).then(res => {
                $.LoadingOverlay('hide');
            })
        })
    }
}
