$(function () {
  $.ajax({
    url: "/meetingRooms"
  })
    .done(function( data ) {
      if ( console && console.log ) {
        var theTemplateScript = $("#cards-template").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        var context = {people:data}
        var theCompiledHtml = theTemplate(context);
        $('#cards-placeholder').html(theCompiledHtml);
      } 
    })
    .always(function(data) {
    // do nothing
    })
});
