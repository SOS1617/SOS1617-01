        angular
            .module("Sos161701App")
            .controller("lisChartCtrlYUS", ["$http", "$scope", function($http, $scope) {
                console.log("Controller chart YUS intialized");
                $http
                    .get("/api/v2/youthunemploymentstats?apikey=sos161701")
                    .then(function(res) {

                        Highcharts.chart('chart', {
                            chart: {
                                type: 'areaspline'
                            },
                            title: {
                                text: 'youth unemployment per country'
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'left',
                                verticalAlign: 'top',
                                x: 150,
                                y: 100,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                            },
                            xAxis: {
                                categories: res.data.map(function(d) {
                                    return d.country;
                                })
                            },
                            yAxis: {
                                title: {
                                    text: 'Youth unemployment stats'
                                }
                            },
                            tooltip: {
                                shared: true,
                                valueSuffix: ' units'
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                areaspline: {
                                    fillOpacity: 0.5
                                }
                            },
                            series: [{
                                name: 'Male stats',
                                data: res.data.map(function(d) {
                                    return Number(d.male_unemployment_ratio);
                                })
                            }, {
                                name: 'Female stats',
                                data: res.data.map(function(d) {
                                    return Number(d.female_unemployment_ratio);
                                })
                            }]
                        });

                        google.charts.load('current', {
                            'packages': ['geochart']
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);

                        function drawRegionsMap() {
                            var myData = [
                                ['Country', 'male_unemployment_ratio']
                            ];
                            res.data.forEach(function(d) {
                                myData.push([d.country, Number(d.male_unemployment_ratio)]);

                            });
                            var data = google
                                .visualization
                                .arrayToDataTable(myData);
                            var options = {
                                colorAxis: {
                                    colors: ['red', 'red']
                                }
                            };
                            var chart = new google.visualization.GeoChart(
                                document.getElementById('regions_div'));
                            chart.draw(data, options);
                        }

                        var a1 = [];
                        var a2 = [];
                        var a3 = [];

                        res.data.forEach(function(e) {
                            a1.push(e.country);
                            a2.push(e.male_unemployment_ratio);
                            a3.push(e.female_unemployment_ratio);

                        });
                        var data = {
                            labels: a1,
                            series: [a2,a3]
                        };

                        var options = {
                            seriesBarDistance: 5
                        };

                        var responsiveOptions = [
                            ['screen and (max-width: 640px)', {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function(value) {
                                        return value[0];
                                    }
                                }
                            }]
                        ];

                        new Chartist.Bar('#chart1', data,options,responsiveOptions);

                    });




            }]);
        