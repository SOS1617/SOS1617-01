angular.module("SSApp")   //Nos pasa dicho módulo que ya hemos creado.
.controller("ListController",["$scope","$http","$location",function($scope,$http,$location){      //En este array están los paquetes que queremos que cargue nuestro controlador. El último elemento del array tiene que ser un callback que debe tener todos los módulos anteriores.
    $scope.url = "/api/v2/startups-stats";
    $scope.apikey="?apikey=";
    $scope.limit = 4;
    $scope.offset = 0;
    
    $scope.actual = 1;
    $scope.max = 1;
    $scope.paginas = [];
    $scope.izq = [];
    $scope.centro = [];
    $scope.der = [];
    var elementsPerPage = 4;
    
   refresh();
    function refresh(){
        if($scope.datas == []){
            console.log("[]");
        }
        if ($scope.offset == 0){
            $http
              .get($scope.url+$scope.apikey+"sos161701"+"&limit="+$scope.limit+"&offset="+$scope.offset+ "&from=10&to=3000")
              .then(function (response){
                    console.log("Data received:"+ JSON.stringify(response.data,null,2));
                    $scope.datas = response.data;
              });
        }
        
       
    }
    $scope.loadinitial=function(){
        $http
            .get($scope.url+"/loadInitialData"+$scope.apikey+$scope.key)
            .then(function(response){
            console.log("LOADINITIAL 200 ok");
            refresh();
            });
    };
    $scope.addData= function(){
        $http.post($scope.url+$scope.apikey+$scope.key,$scope.newData)
        .then(function(response){
            console.log("POST finished");
            swal({
              title: "Done!",
              text: "The resource has been successfully created.",
              imageUrl: "http://freeiconbox.com/icon/256/9819.png"
            });
            refresh();
        },function error(response){
            if (response.status==409){
                swal({
                  title: "Wrong!",
                  text: "The resource already exist.",
                  imageUrl: "https://image.freepik.com/iconos-gratis/pulgares-abajo-silueta_318-41911.jpg"
                });
            }
        }
        );
        
    };
    $scope.editData=function(){
        var url=$scope.url+"/"+$scope.edit.country+$scope.apikey+$scope.key;
        console.log("Dato url "+url);
        var coun=JSON.stringify($scope.edit);
        console.log(("Country->"+coun));
        $http.put(url,coun)
            .then(function(){
                console.log("PUT finished");
                refresh();
            });
    };
   $scope.deleteData=function(data2){
       
          $http.delete($scope.url+"/"+data2+$scope.apikey+$scope.key)
            .then(function(response){
                console.log("DELETE ONE 200 ok");
                refresh();
            
        });
        
    };
    $scope.loadData=function(data3){
        
        $http.get($scope.url+"/"+data3+$scope.apikey+$scope.key)
            .then(function(response){
                console.log("GET 200 ok");
                $scope.load = response.data;
                
            });
        
    };
    $scope.removeAll=function(){
        swal({
          title: "Are you sure?",
          text: "All the resources will be delete",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            swal("Deleted!", "The resources have been deleted.", "success");
            $http.delete($scope.url+$scope.apikey+$scope.key)
            .then(function(){
                console.log("REMOVE All ok");
                refresh();
            });
          } else {
            swal("Cancelled", "The resources are safe :)", "error");
          }
        });
        
    };
         
         
    $scope.listCountry= function(){
        $http
            .get($scope.url+"?apikey="+$scope.apikey+$scope.key+"&limit="+$scope.limit+"&offset="+$scope.offset)
            .then(function (response){
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.datas=response.data;
            console.log("GET 200 ok"); 
            });
    };
    
    
    
    $scope.check = function(){
        if($scope.key2 === "sos161701"){
            $scope.key = $scope.key2;
            swal("Nice!", "Correct Password!", "success");
            
        }
        if ($scope.key2 != "sos161701"){
            if ($scope.key2 == ""){
                sweetAlert("Oops...", "Empty Password!", "error");
            }else{
               sweetAlert("Oops...", "Incorrect Password!", "error"); 
            }
            
            $scope.key = $scope.key2;
        }
    };
    
    /*
    $scope.paginacion2= function(){   //siguiente
        
            $scope.offset = $scope.offset+4;
       
            $http
                .get($scope.url+$scope.apikey+"sos161701&limit="+$scope.limit+"&offset="+$scope.offset + "&from=10&to=3000")
                .then(function (response){
                     $scope.datas=response.data;
                    console.log("GET 200 ok");
                    //refresh();
                });
    };
    
    $scope.paginacion= function(){  //anterior
       
            $scope.offset = 0;
        
            $http
                .get($scope.url+$scope.apikey+"sos161701&limit="+$scope.limit+"&offset="+$scope.offset+ "&from=10&to=3000")
                .then(function (response){
                    $scope.datas=response.data;
                    console.log("GET 200 ok");
                    //refresh();
                });
    };
    */
    
    
    function pagination() {
        var pagesNearby = 2;
        $scope.izq = [];
        $scope.centro = [];
        $scope.der = [];
        if ($scope.max <= pagesNearby * 2) {
            for (var i = 1; i <= $scope.max; i++) $scope.izq.push(i);
        }
        else if ($scope.actual >= 0 && $scope.actual <= pagesNearby) {
            for (var i = 1; i <= pagesNearby; i++) $scope.izq.push(i);
            for (i = $scope.max - pagesNearby + 1; i <= $scope.max; i++) $scope.centro.push(i);
        }
        else if ($scope.actual >= $scope.max - pagesNearby + 1 && $scope.actual <= $scope.max) {
            for (var i = 1; i <= pagesNearby; i++) $scope.centro.push(i);
            for (i = $scope.max - pagesNearby + 1; i <= $scope.max; i++) $scope.der.push(i);
        }
        else {
            
            for (var i = 1; i <= pagesNearby; i++) $scope.izq.push(i);
            for (var i = Math.max($scope.actual - 1, pagesNearby + 1); i <= Math.min($scope.actual + 1, $scope.max - pagesNearby); i++) $scope.centro.push(i);
            for (i = $scope.max - pagesNearby + 1; i <= $scope.max; i++) $scope.der.push(i);
            if (($scope.izq[$scope.izq.length - 1] == $scope.centro[0] - 1) && ($scope.centro[$scope.centro.length - 1] == $scope.der[0] - 1)) {
                $scope.centro = $scope.centro.concat($scope.der);
                $scope.izq = $scope.izq.concat($scope.centro);
                $scope.centro = [];
                $scope.der = [];
            }
            else if ($scope.izq[$scope.izq.length - 1] == $scope.centro[0] - 1) {
                $scope.izq = $scope.izq.concat($scope.centro);
                $scope.centro = [];
            }
            else if ($scope.centro[$scope.centro.length - 1] == $scope.der[0] - 1) {
                $scope.der = $scope.centro.concat($scope.der);
                $scope.centro = [];
            }
        }
    }


    $scope.cambio = function(page) {
        $scope.actual = page;
        $scope.refrescar();
    };

    $scope.anterior = function() {
        $scope.actual--;
        $scope.refrescar();
    };

    $scope.siguiente = function() {
        $scope.actual++;
        $scope.refrescar();
    };
    
    
     $scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.datas.length / $scope.pageSize) > 10)
            fin = 10;
          else
            fin = Math.ceil($scope.datas.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.datas.length / $scope.pageSize) - 10) {
            ini = Math.ceil($scope.datas.length / $scope.pageSize) - 10;
            fin = Math.ceil($scope.datas.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      };

      $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
      };
    }
  ])
    
           
;


    /* Para añadir un parámetro al modelo tenemos que añadirlo así: ng-model="nombreCualquiera". 
        Y para visualizar en el mismo html eso podemos poner en cualquier parte {{nombreCualquiera}} y veremos lo guardado en dicho modelo 
        Si lo metemos en <pre></pre> nos respetará tabulaciones y demás */