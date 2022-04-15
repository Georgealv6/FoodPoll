var dataPoints = [
    { label: "Pizza", y: 0 },
    { label: "Burgers", y: 0 },
    { label: "Tacos", y: 0 },
    { label: "Pasta", y: 0 },
]
var chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme5",
        data: [{
            type: "column",
            dataPoints: dataPoints
        }]
    });
    chart.render();
}

Pusher.logToConsole = true;


var pusher = new Pusher('dac14031a631f38eba3a', {
    cluster: 'us2',
    encrypted: true
});


var channel = pusher.subscribe('poll');

// Listen to vote event
channel.bind('vote', function(data) {
    dataPoints = dataPoints.map(dataPoint => {
        console.log(data[4])
        if (dataPoint.label == data[4].name[0]) {

            dataPoint.y += 1;
        }
        return dataPoint
    });


    chart.render()
});