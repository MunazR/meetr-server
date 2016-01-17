$(function () {


  $.ajax({
    url: "/meetingRooms"
  })
    .done(function( data ) {
      if ( console && console.log ) {
        for (var i = 0; i < data.length; i++) {
          timeRanges = data[i].bookings;
          isAvailable = true;
          for (var j = 0; j < timeRanges.length; j++) {
            var start = new Date(timeRanges[j].startTime);
            var end = new Date(timeRanges[j].endTime);
            var now = new Date();

            if(start <= now && end >= now) isAvailable = false;
          };
          data[i].available = isAvailable;
        }

        // get availability numbers
        var available = 0;
        var reserved = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].available)
            available++;
          else
            reserved++;
        }

        // Run google chart
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ['Availability', 'Rooms available'],
            ['Reserved',     reserved],
            ['Available',    available]
          ]);

          var options = {
            title:           'Room Availabilty',
            pieHole:         0.6,
            colors:          ['#FF4081','#3F51B5'],
            chartArea:       {
              left:          15,
              top:           20,
              width:         '95%',
              height:        '90%'
            },
            fontName:        'Roboto',
            legend: {
              position:      'labeled',
            },
            pieSliceText:     'value'
          };

          var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
          chart.draw(data, options);
        }
      } 
    })
    .always(function(data) {
    // do nothing
    })
});
