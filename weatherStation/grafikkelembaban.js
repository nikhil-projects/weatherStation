const FireBase1 = firebase.database().ref().child("DHT11").child("Kelembaban"); 
var result;    
var snap = function(datasnapshot){         
result = parseFloat(datasnapshot.val())
};
FireBase1.on("value", snap)
Highcharts.setOptions({
    global: {
        useUTC: false
    }
});


Highcharts.stockChart('content', {
    chart: {
        events: {
            load: function () {

                
                var series = this.series[0];
                
                setInterval(function () {
                    var x = (new Date()).getTime(), 
                        y = result;
                       
            console.log(x); 
                  
                   series.addPoint([x, y], true);
                }, 1000);
            }
        }
    },


    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },
    title: {
        text: 'History Monitoring Kelembaban'
    },
    tooltip: {
            split: true
        },



    yAxis: {
        title: {
            text: '(%) \xB0'
        }
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Kelembaban',
        data: [[new Date().getTime(), result]]
    }]
});
