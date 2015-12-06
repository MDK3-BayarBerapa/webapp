'use strict'

var app = angular.module('bayarBerapa', ['ngResource', 'ngRoute', 'toggle-switch']);

// app.config(function(uiGmapGoogleMapApiProvider) {
//   uiGmapGoogleMapApiProvider.configure({
//       key: 'AIzaSyCbQ5yY89z6ZziaXrrnpL_HcJKLRu1T6sQ',
//       v: '3.17',
//       libraries: 'weather,geometry,visualization'
//   });
// });
app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/:view', {
      templateUrl: function(params){return '/partial/' + params.view},
      controller: 'dashboardController'
    })
    .otherwise({redirectTo: '/transaksi_propinsi'});
}]);

app.controller('transaksiController', ['$scope', '$window', 'BayarBerapaService',
    function($scope,  $window, BayarBerapaService){
        //(function tick(){
        //    var nodeData = NodeService.get(function(){
        //        $scope.nodeList = nodeData;
        //    });
        //    $timeout(tick, 2000);
        //})();

        function init() {
          $scope.selectedProvinsi = "";
          $scope.selectedPemda ="";
          $scope.selectedLayanan ="";
          $scope.pemdaMap = {};
          $scope.getProvinsiList(function(){
            $scope.pemdaList =[{
              IDPemda: "",
              NamaPemda: "-- Pilih Pemda --"
            }];
            $scope.provinsiList.unshift({IDProv: "", NamaProvinsi: "-- Pilih Provinsi --"})
          });
          $scope.getJenisLayananList(function(){
            $scope.layananList.unshift({
              IDLayanan: "",
              NamaLayanan: "-- Pilih Layanan --"
            });
          });
          console.log($scope.provinsiList);
            //$scope.updateView();
            //mySocket.forward('ip_update', $scope);
            //$scope.$on('socket:ip_update', function(ev, data) {
            //    console.log("get message");
            //    $scope.updateView();
            //});
            //mySocket.on('ip_update', function() {
            //    console.log("get message");
            //    $scope.updateView();
            //});
        };
        $scope.getProvinsiList = function(callback) {
          var provlist = BayarBerapaService.get({cmd:"getProvinsi"}, function(){
            $scope.provinsiList = provlist;
            if(callback !== null)
              callback();
          });
        }

        $scope.getPemdaList = function(provinsi, callback) {
          var pemdalist = BayarBerapaService.get({cmd:"getPemda", param: provinsi}, function(){
            $scope.pemdaList = pemdalist;
            if(callback !== null)
              callback();
          });
        }

        $scope.updatePemdaList = function() {
          $scope.getPemdaList($scope.selectedProvinsi, function(){
            $scope.pemdaMap = {};
            for(var i =0; i < $scope.pemdaList.length; i++){
              $scope.pemdaMap[$scope.pemdaList[i].IDPemda] = $scope.pemdaList[i];
            }
            $scope.pemdaList.unshift({
              IDPemda: "",
              NamaPemda: "-- Pilih Pemda --"
            });
          });

        }

        $scope.getJenisLayananList = function(callback) {
          var layananlist = BayarBerapaService.get({cmd:"getJenisLayanan"}, function(){
            $scope.layananList = layananlist;
            if(callback !== null)
              callback();
          });
        }
        $scope.validateForm = function(){
            if(typeof $scope.selectedProvinsi === 'undefined' || $scope.selectedProvinsi.length == 0 ||
              typeof $scope.selectedPemda === 'undefined' || $scope.selectedPemda.length == 0 ||
              typeof $scope.selectedLayanan === 'undefined' || $scope.selectedLayanan.length == 0) {
                console.log("error");
                $scope.hasError = true;
                $scope.errorMsg = "Parameter Validation Error";
                return;
            }
            else {
                $scope.kirimTransaksi();
            }
        }

        $scope.kirimTransaksi = function() {
          var today = new Date();
          var year = today.getFullYear().toString();
          var month = (today.getMonth() > 10) ? today.getMonth().toString() : '0' + today.getMonth().toString();
          var date = (today.getDate() > 10) ? today.getDate().toString() : '0' + today.getDate().toString();
          var data = {
            TglKejadian: year + '-' + month + '-' + date,
            KodePropinsi: $scope.selectedProvinsi,
            KodeDati2: $scope.selectedPemda,
            KodeLayanan: $scope.selectedLayanan,
            NamaKantor: $scope.namaKantor,
            Bayar: $scope.bayar,
            GPSLOkasi: '0,0',
            FotoLokasi: ''
          }
          BayarBerapaService.postTransaksi({cmd:'kirimTransaksi'}, data, function(){
            //$location.url('/transaksi_detail?dati2_id=' + $scope.selectedPemda + '&dati2_name=' + dati2.NamaDati2);
            $window.location.href = '/dashboard/transaksi_detail?dati2_id=' + $scope.selectedPemda + '&dati2_name=' + $scope.pemdaMap[$scope.selectedPemda].NamaPemda;
          });
        }

        init();
    }]);

app.controller('dashboardController', ['$scope', '$routeParams', '$location', 'BayarBerapaService',
  function($scope, $routeParams, $location, BayarBerapaService){
    $scope.dataBayarProvinsi = [];
    function init(){
        if($routeParams.view == 'transaksi_propinsi'){
          $scope.getDataBayarPerProvinsi();
        }
        else if($routeParams.view == 'transaksi_pemda'){
          $scope.getDataBayarPerDati2($routeParams.prov_id);
          $scope.namaProvinsi = $routeParams.prov_name;
        }
        else if($routeParams.view == 'transaksi_detail'){
          $scope.getDetailBayar($routeParams.dati2_id);
          $scope.namaDati2 = $routeParams.dati2_name;
        }
    }
    // $scope.$on('$locationChangeSuccess', function(){
    //   console.log($routeParams);
    //   if($routeParams.view == 'transaksi_pemda'){
    //     $scope.getDataBayarPerDati2($routeParams.params.prov_id);
    //   }
    //   //$scope.$digest();
    // });
     $scope.getDataBayarPerProvinsi = function(){
      var ret = BayarBerapaService.get({cmd: 'getDataBayarPerProvinsi'}, function(){
        $scope.dataBayarProvinsi = ret;
      });
    };
    $scope.viewBayarDiti2 = function(prov){
      $location.url('/transaksi_pemda?prov_id=' + prov.IDrovinsi + '&prov_name=' + prov.NamaProvinsi);
    };
    $scope.getDataBayarPerDati2 = function(prov){
      var ret = BayarBerapaService.get({cmd: 'getDataBayarPerDati2', param: prov}, function(){
        $scope.dataBayarDati2 = ret;
      });
    };

    $scope.viewHistoryLayanan = function(dati2){
      $location.url('/transaksi_detail?dati2_id=' + dati2.IDDati2 + '&dati2_name=' + dati2.NamaDati2);
    }

    $scope.getDetailBayar = function(dati2){
      var ret = BayarBerapaService.get({cmd: 'getDetailBayar', param: dati2}, function(){
        $scope.dataBayarDetail = ret;
      });
    };
    init();
  }]);


    // .when('/dashboard/partialpemda/:', {
    //   templateUrl: 'partial/pemda',
    //   controller: 'dashboardController'
    // })
    // .when('/kantor', {
    //   templateUrl: 'partial/partialkantor',
    //   controller: 'dashboardController'
    // });


app.service('BayarBerapaService', ['$resource', function($resource) {
    return $resource('/bayarBerapa/:cmd/:param', {}, {
        get: {method: 'GET', isArray: true},
        postTransaksi: {method: 'POST'}
    });
}]);
