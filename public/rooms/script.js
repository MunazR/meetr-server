$(function () {
  $.ajax({
    url: "/meetingRooms"
  })
    .done(function( data ) {
      if ( console && console.log ) {

        for (var i = 0; i < data.length; i++) {
          timeRanges = data[i].bookings;
          isAvailable = true;
          toDelete = [];
          for (var j = 0; j < timeRanges.length; j++) {
            var start = new Date(timeRanges[j].startTime);
            var end = new Date(timeRanges[j].endTime);
            var now = new Date();

            if(start <= now && end >= now) isAvailable = false;
            data[i].bookings[j].start = start.toLocaleString();
            data[i].bookings[j].end = end.toLocaleString();

            if(start <= now && end <= now) toDelete.push(j);
          };

          for (var k = 0; k < toDelete.length; k++) {
            var x = toDelete[k];
            data[i].bookings.splice(x, x);
          };

          if (isAvailable) {
            data[i].availEng = 'Available';
            data[i].color = 'color: rgb(76, 175, 80)';
          } else {
            data[i].availEng = 'Reserved';
            data[i].color = 'color: rgb(233, 30, 99);';
          }
        }

        var theTemplateScript = $("#cards-template").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        var context = {room:data}
        var theCompiledHtml = theTemplate(context);
        $('#cards-placeholder').html(theCompiledHtml);
      } 
    })
    .always(function(data) {
    // do nothing
    })
});

$('#search').keypress(function() {
  alert('hello');
});
