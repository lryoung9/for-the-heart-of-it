     // COORS CODE 
    jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  var category = "community";

$(".categories").on("click", function(){
  // console.log($(this).attr("data-cat"))
  category = $(this).attr("data-cat")
})


  $("#search-submit").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the zip textbox
    var zip = $("#zip-input").val().trim();

    if (category != "" && zip != "") {
     var key = "1b271629571b22b797a713d217841";
    var queryURL = "https://api.meetup.com/2/open_events?&sign=true&photo-host=public&country=United States&topic=" + category + "&zip=" + zip + "&state=CO&page=20&key=" + key ;
    console.log(queryURL)


    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      // console.log(response);
      results = response.results;

      console.log(results)

      // clear both search boxes
      $('#search-submit').empty();
      $('#zip-input').empty();

      // loop through results; response.data is an array
      // for (var i = 0; i < results.length; i++) {

      //   var holder = $("<div>")


      //   var group = results[i].group.name
      //   var address = results[i].venue.address_1
      //   var url = results[i].event_url
      //   var description = results[i].description
        

      //   holder.append(group)
      //   holder.append(address)
      //   holder.append(url)
      //   holder.append(description)


      //   $("#search-results").append(holder)
        
      // }

        for (var i = 0; i < results.length; i++) {
          var newTR = $("<tr>")

          var group = results[i].group.name
          var group = results[i].venue.city

          var newTDs = $("<td><a class='event' href='#'>" + response.group + "</a></td><td>" + response.city + "</td>");
          newTR.append(newTDs);

          $("#eventTable tbody").append(newTR);
        }


    });
    } else {
      // jQuery's .show() automatically shows something, which overrides the css's 'display: none'... the opposite of .show() is (you guessed it!) .hide()
      $(".formError").show();
      return false;
    }
    // The city from the textbox is then added to our array
    // topics.push(city);

    // city = $("#city-input").val('');

    // // Calling renderButtons which handles the processing of city array
    // renderButtons();

  });
