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

        // get availability numbers & set availability tags
        var available = 0;
        var reserved = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].available){
            available++;
            data[i].availEng = "Available"
            data[i].color = 'color: rgb(76, 175, 80)';
          } else {
            reserved++;
            data[i].availEng = "Reserved"
            data[i].color = 'color: rgb(233, 30, 99);';
          }

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


        // load table

        var theTemplateScript = $("#trs-template").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        var context = {room:data}
        var theCompiledHtml = theTemplate(context);
        $('#trs-placeholder').html(theCompiledHtml);
      } 
    })
    .always(function(data) {
    // do nothing
    })
});
