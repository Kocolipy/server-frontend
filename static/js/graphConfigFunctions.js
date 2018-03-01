function plotRiskGraph(data) {
    var chart = AmCharts.makeChart("comparisonGraphContainer", {
        "type": "gantt",
        "theme": "black",
        "marginRight": 70,
        "columnWidth": 0.5,
        "gradientOrientation": "vertical",
        "valueAxis": [{
            "type": "value",
            "title": "Cycle"
        }],
        "categoryAxis": {
            "title": "Individual aircrafts ID's"
        },
        "brightnessStep": 10,
        "graph": {
            "fillAlphas": 1,
            "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDate": "0",
        "startField": "start",
        "endField": "end",
        "durationField": "duration",
        "dataProvider": data,
        "valueScrollbar": {
            "autoGridCount": true
        },
        "chartCursor": {
            "cursorColor": "#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.5,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable": false,
            "valueZoomable": true
        },
        "export": {
            "enabled": true
        }
    });
}

function plotRULVariationGraph(data) {
    var len = data.length;
    var average = [];
    for (i = 0; i < len; i++) {
        var elem = [data[i][0], data[i][3]];
        average.push(elem);
    }
    Highcharts.chart('graphContainer', {

        title: {
            text: 'Predicted number of remaining working cycles'
        },
        subtitle: {
            text: 'given the current cycle'
        },
        yAxis: {
            title: {
                text: 'Predicted number of cycles before failure'
            }
        },
        xAxis: {
            title: {
                text: 'Current cycle number'
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
        },

        legend: {},

        series: [
            {
                name: 'Predicted RUL',
                data: average,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Bounds of prediction: ',
                data: data,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }]
    });
}

function plotDistributionOfCyclesGraph(data) {
    aircrafts = (SELECTEDAIRCRAFTS.length == 0) ? (AIRCRAFTLIST.map(x => x.split(" ")[1])).slice(0, 10) :  SELECTEDAIRCRAFTS;
    Highcharts.chart('comparisonGraphContainer', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Distribution of cycles'
        },
        xAxis: {
            categories: aircrafts,
            title: {
                text: "Aircrafts IDs"
            }

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of cycles'
            }
        },
        colors: ['#35508F', '#3A5DAD', '#253355'],
        tooltip: {
            headerFormat: '<span style="font-size:16px"> Aircraft number: {point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} cycles</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: data
    });
}

function dustExposureGraph(data) {
    Highcharts.chart('graphContainer', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Dust exposure against cycles'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            min: 0,
            title: {
                text: 'Cycle Number'
            },
            type: 'linear'
        },
        yAxis: {
            floor: 0,
            title: {
                text: 'Dust per cycle(grams per square metre)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<span style="font-size:13px"> Cycle number: {point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} grams</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: 0
            }
        },

        series: [{
            type: 'area',
            name: 'Dust:',
            data: data
        }]
    });
}

function dustAccumulationGraph(data) {
    Highcharts.chart('graphContainer', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Total Dust Exposure against cycles'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            min: 0,
            title: {
                text: 'Cycle Number'
            },
            type: 'linear'
        },
        yAxis: {
            floor: 0,
            title: {
                text: 'Dust Exposure (grams per square metre)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<span style="font-size:13px"> Cycle number: {point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} grams</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: 0
            }
        },

        series: [{
            type: 'area',
            name: 'Dust:',
            data: data
        }]
    });
}

function failureChance(data) {
    Highcharts.chart('graphContainer', {

        chart: {
            type: 'area',
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },

        title: {
            text: 'Probability of failure '
        },

        subtitle: {
            text: 'within the next X cycles'
        },


        xAxis: {
            labels: {
                format: '{value}'
            },
            minRange: 5,
            title: {
                text: 'Within the next X cycles'
            }
        },

        yAxis: {
            floor: 0,
            ceiling: 100,
            startOnTick: true,
            endOnTick: false,
            maxPadding: 0.35,
            title: {
                text: 'Probability of Engine Failure'
            },
            labels: {
                format: '{value} %'
            }
        },

        tooltip: {
            headerFormat: ' Working cycles so far: {point.x:.1f}  <br>',
            pointFormat: ' Chance of failure {point.y}%',
            shared: true
        },

        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1

                    },
                    fillOpacity: 0.5,
                    stops: [
                        [0, '#AE002C'],
                        [1, '#45AD3A']
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: 50
            }
        },

        series: [{
            data: data,
            lineColor: Highcharts.getOptions().colors[0],
            color: 'black',
            fillOpacity: 0.5,
            name: 'Elevation',
            marker: {
                enabled: false
            },
            threshold: null
        }]

    });

}

function RULwithDust(data) {
    values = data[0].map(function (elt) {
        return elt[1];
    });
    ub = Math.max.apply(null, values)
    lb = Math.min.apply(null, values)
    lb = 1.5 * lb - 0.5 * ub
    values = data[1].map(function (elt) {
        return elt[1];
    });
    dustUb = Math.max.apply(null, values) * 3
    Highcharts.chart('graphContainer', {
        title: {
            text: 'Predicted number of cycles before failure'
        },
        subtitle: {
            text: 'Dust data'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: 'Current cycle'
            },
            labels: {
                format: '{value} '
            },
            maxPadding: 0.05,
            showLastLabel: true
        },
        yAxis: [{ // Primary yAxis
            min: lb,
            max: ub,
            title: {
                text: 'Remaining predicted cycles'
            },
            labels: {
                format: '{value}'
            },
            lineWidth: 2
        }, { // Secondary yAxis
            floor: 0,
            max: dustUb,
            title: {
                text: 'Dust per cycle (grams per square metre)',
            },
            labels: {
                format: '{value} grams'
            },
            opposite: true
        }],
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x}, {point.y:.1f}'
        },
        plotOptions: {
            spline: {
                marker: {
                    enable: false
                }
            }
        },
        series: [{
            type: 'spline',
            name: 'Cycle, Remaining',
            data: data[0]
        }, {
            type: 'area',
            name: 'Cycle, Dust (g): ',
            yAxis: 1,
            data: data[1]
        }]
    });
}
function geoMap() {
    /**
 * SVG path for target icon
 */
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

/**
 * SVG path for plane icon
 */
var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";

/**
 * Create the map
 */
var map = AmCharts.makeChart( "comparisonGraphContainer", {
  "type": "map",
"theme": "light",


  "dataProvider": {
    "map": "worldLow",
    "zoomLevel": 3.5,
    "zoomLongitude": -55,
    "zoomLatitude": 42,

    "lines": [ {
      "id": "line1",
      "arc": -0.85,
      "alpha": 0.3,
      "latitudes": [ 48.8567, 43.8163, 34.3, 23 ],
      "longitudes": [ 2.3510, -79.4287, -118.15, -82 ]
    },   ],
    "images": [ {
      "svgPath": targetSVG,
      "title": "Paris",
      "latitude": 48.8567,
      "longitude": 2.3510
    }, {
      "svgPath": targetSVG,
      "title": "Toronto",
      "latitude": 43.8163,
      "longitude": -79.4287
    },
        {
      "svgPath": targetSVG,
      "title": "Toronto",
         "balloonText": 'evrfbg',
      "latitude": 43.8163,
      "longitude": 42.4287
    },
        {
      "svgPath": targetSVG,
      "title": "Los Angeles",
      "latitude": 34.3,
      "longitude": -118.15
    }, {
      "svgPath": targetSVG,
      "title": "Havana",
      "latitude": 23,
      "longitude": -82
    }, {
      "svgPath": planeSVG,
      "positionOnLine": 0,
      "color": "#000000",
      "alpha": 0.1,
      "animateAlongLine": true,
      "lineId": "line2",
      "flipDirection": true,
      "loop": true,
      "scale": 0.03,
      "positionScale": 1.3
    }, {
      "svgPath": planeSVG,
      "positionOnLine": 0,
      "color": "#585869",
      "animateAlongLine": true,
      "lineId": "line1",
      "flipDirection": true,
      "loop": true,
      "scale": 0.03,
      "positionScale": 1.8
    } ]
  },

  "areasSettings": {
    "unlistedAreasColor": "black"
  },

  "imagesSettings": {
    "color": "#585869",
    "rollOverColor": "#585869",
    "selectedColor": "#585869",
    "pauseDuration": 0.2,
    "animationDuration": 2.5,
    "adjustAnimationSpeed": false
  },

  "linesSettings": {
    "color": "mintcream",
    "alpha": 0.4,

    "bringForwardOnHover":true

  },

  "export": {
    "enabled": true
  }

} );

}