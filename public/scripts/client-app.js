$(document).ready(function() {
  console.log("document ready!");

  $("#search").on('click', getResults);

  function getResults() {
    $("#resultsList").empty();
    var keywords = $("#keywords").val();
    console.log(keywords);
    $.ajax({
      type: 'GET',
      url: '/indeed',
      headers: {
        keywords: keywords
      },
      success: function() {
        console.log("success runs first");
      }
    }).then(function(response) {
      console.log(response);
      for(let i = 0; i < response.length; i ++) {
        $("#resultsList").append('<li><a target="_blank" href="' + response[i].url + '">' + response[i].company + '</a><ul><li>' + response[i].snippet + '</li></ul></li>');
      }
      return response;
    })
  }

})
