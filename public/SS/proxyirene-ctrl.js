angular
    .module("Sos161701App")
    .controller("ProxyIreneCtrl", ["$http","$scope", function($http,$scope) {
        console.log("Controller chart intialized");
            $http
                .get("/proxyirene")
                .then(function(res) {
                    Highcharts.chart('container3', {
                        chart: {
                            type: 'column',
                            options3d: {
                            enabled: true,
                            alpha: 10,
                            beta: 25,
                            depth: 70
                            
                        }
                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Income Ratio per Country'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: res.data.map(function(d) {
                            return d.country;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'usageinternet',
                        data: res.data.map(function(d){
                            return Number(d.usageinternet);
                        })
                    }]
                });
                
                
                
                });
    }]);
