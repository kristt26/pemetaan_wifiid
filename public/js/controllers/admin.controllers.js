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
    
    dashboardServices.get().then(res=>{
        $scope.datas = res;
        $scope.$applyAsync(x=>{
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [140.7052499, -2.5565586],
                zoom: 12
            });
            $scope.datas.forEach(param => {
                var item = new mapboxgl.Marker({ color: param.status=='Diajukan'?'red':param.status=='Proses' ? 'Yellow' : '' })
                    .setLngLat([Number(param.long), Number(param.lat)])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h4><strong>Nomor Laporan: ${param.nomor}</strong></h4><p>Permasalahan: ${param.kerusakan}<br>Status: <strong>${param.status}</strong></p>`
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

function keluhanController($scope, keluhanServices, pesan) {
    $scope.$emit("SendUp", "Keluhan Konsumen");
    $scope.datas = [];
    $scope.model = {};
    $scope.peta = false;
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
    }

    $.LoadingOverlay('show');
    keluhanServices.get().then(res => {
        $scope.datas = res;
        console.log(res);
        $.LoadingOverlay('hide');
    })

    $scope.tampilPeta = (param) => {
        $scope.$applyAsync(x => {
            if (direction) {
                direction.removeRoutes();
                direction.removeWaypoint();
            }
            if (marker) marker.remove();
            if (all.length != 0) {
                for (let index = 0; index < all.length; index++) {
                    all[index].remove();
                }
            }
            marker = new mapboxgl.Marker()
                .setLngLat([Number(param.long), Number(param.lat)])
                .addTo(map);
            if (!direction) {
                direction = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    // controls: {
                    //     inputs: false,
                    //     instructions: false,
                    //     profileSwitcher: false
                    // }
                });
                map.addControl(direction, 'top-left');
                setTimeout(() => {
                    direction.setOrigin([140.70533, -2.55661]);
                    direction.setDestination([param.long, param.lat]);
                }, 2000);


                direction.on("route", e => {
                    // routes is an array of route objects as documented here:
                    // https://docs.mapbox.com/api/navigation/#route-object
                    let routes = e.route
                    console.log(routes);

                    // Each route object has a distance property
                    console.log("Route lengths", routes.map(r => r.distance))
                })
            } else {
                direction.setOrigin([140.70533, -2.55661]);
                direction.setDestination([param.long, param.lat]);
            }
            if (!current) {
                current = map.addControl(
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
            }
            $scope.peta = true;
        })
    }

    $scope.allMarker = () => {
        $scope.arah = false;
        $scope.$applyAsync(x => {
            if (marker) {
                marker.remove();
            }
            if (direction) {
                map.removeControl(direction);
            }
            if (all.length != 0) {
                for (let index = 0; index < all.length; index++) {
                    all[index].remove();
                }
            }
            $scope.datas.keluhan.forEach(param => {
                var item = new mapboxgl.Marker()
                    .setLngLat([Number(param.long), Number(param.lat)])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h4>nomor:${param.nomor}</h4><p>${param.kerusakan}</p>`
                            )
                    )
                    .addTo(map);
                all.push(item);
            });

            if (!current) {
                current = map.addControl(
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
            }
            $scope.peta = true;
        })
    }

    $scope.setDirection = (param) => {
        if (param) {
            $scope.$applyAsync(x => {
                direction = new MapboxDirections({
                    accessToken: mapboxgl.accessToken
                });
                map.addControl(direction, 'top-left');
            })
        } else {
            $scope.$applyAsync(x => {
                map.removeControl(direction);
                // var element = document.querySelectorAll('.mapboxgl-ctrl-directions');
                // element.forEach(box => {
                //     box.remove();
                // });
                // direction.removeRoutes();
                // direction.removeWaypoint();
                // direction = undefined
                // console.log(direction);
            })
        }
        console.log(param);
    }

    $scope.kembali = () => {
        $scope.peta = false;
    }

    $scope.mulai = () => {
        $scope.hasil = undefined;
        $("#mulai").modal('hide');
        $.LoadingOverlay('show');
        setTimeout(() => {
            $scope.setData = angular.copy($scope.datas)
            $scope.pertanyaan = angular.copy($scope.setData.pengetahuan[0]);
            $("#mulai").modal('show');
            $.LoadingOverlay('hide');
        }, 200);
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

    $scope.save = () => {
        pesan.dialog('Yakin ingin menyimpan hasil?', "Ya", "Tidak", "info").then(x => {
            $.LoadingOverlay('show');
            $scope.model.kerusakan = $scope.hasil.kerusakan;
            $scope.model.kerusakan_id = $scope.hasil.id;
            keluhanServices.post($scope.model).then(res => {
                $scope.model = {};
                $scope.gejala = {};
                $scope.hasil = undefined;
                $.LoadingOverlay('hide');
                $("#mulai").modal('hide');
            })
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
