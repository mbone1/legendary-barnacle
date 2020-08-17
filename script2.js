// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// ⮛ ⮙ ⮘ ◙
// ⮘
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ ⮙ ⮘
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
let apiKeyDef = "93b75b830f3da96083a3b6252ba8705b"; //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘ my API key
let apiCall = "http://api.openweathermap.org/data/2.5/weather?q="; //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘ queryURL for search based upon city name
let apiCallLaLo = "http://api.openweathermap.org/data/2.5/uvi?appid="; //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘ queryURL for search based upon latitude + longitude
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
$(".citySearch").click(function () {
  let city = $(".cityName").val();
  let queryURL = apiCall + city + "&appid=" + apiKeyDef;

  $.ajax({
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘ INITIAL AJAX CALL, BASED UPON WHATEVER CITY USER HAS ENTERED TO SEARCH UNDER
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
    let rspnsArray = Object.values(response); // ⮘ Changes response to an array
    let rspnsArrayL2 = Object.values(response.weather[0]); // ⮘ Changes object within that array into array, used to pull ID for icon of forecast
    let rspnsArrayL3 = Object.values(response.wind); // ⮘ Changes object within that array into array, used to pull windspeed
    let rspnsArrayL4 = Object.values(response.coord); // ⮘ Changes object with an array, used to pull latitude and longitude
    let longitude = rspnsArrayL4[0]; // ⮘ Pulls from array - used in API calls for UV Index and 5-day forecast
    let latitude = rspnsArrayL4[1]; // ⮘ Pulls from array - used in API calls for UV Index and 5-day forecast
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ CREATING VARIABLES FOR DATA TO APPEND TO PAGE
    let icon = rspnsArrayL2[3]; // ⮘ Pulls from array, used to pull icon
    let iconURL = "http:openweathermap.org/img/wn/" + icon + "@2x.png";
    let location = rspnsArray[11]; // ⮘ Pulls from array, used to pull location
    let initTemp = (rspnsArray[3].temp - 273.15) * 1.8 + 32; // ⮘ Pulls from array, used to pull temp, comes back as kelvin, converts to fahrenheit
    let temperature = initTemp.toFixed(); // ⮘ Removes decimal from temperature
    let humidity = rspnsArray[3].humidity; // ⮘ Pulls from array, used to pull humidity
    let windSpeed = rspnsArrayL3[0];
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ CREATING VARIABLES FOR DATA TO APPEND TO PAGE
    let indexUV = // ◙◙◙◙◙ ⮘ creating URL for UV Index AJAX Call
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKeyDef +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;

    $.ajax({
      // ◙◙◙◙◙ ⮙ SECONDARY AJAX CALL, BASED ON LATITUDE/LONGITUDE OF CITY SELECTED BY USER
      url: indexUV,
      method: "GET",
    }).then(function (response1) {
      console.log(response1);
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
      let rspnsArray1 = Object.values(response1); // ◙◙◙◙◙ ⮘ Changes response1 to an array
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ CREATING VARIABLES FOR DATA TO APPEND TO PAGE
      let UVindex = rspnsArray1[4]; // ◙◙◙◙◙ ⮘ Pulls UV Index from array
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ CREATING VARIABLES FOR DATA TO APPEND TO PAGE
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ BUILDING TOP CARD
      $("#topCard").append("<img src=" + iconURL + ">"); // ⮘ Places image of current weather conditions to top card
      $("#cBody").append("<h5>" + location + "</h5>"); // ⮘ Places current location in top card
      $("#cBody").append(
        "<p class=card-text>" +
          "Current Temperature: " +
          temperature +
          "°F" +
          "</p>"
      ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
      $("#cBody").append(
        "<p class=card-text>" + "Humidity: " + humidity + "%" + "</p>"
      ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
      $("#cBody").append(
        "<p class=card-text>" + "Windspeed: " + windSpeed + "MPH" + "</p>"
      ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
      $("#cBody").append(
        "<p class=card-text>" + "UV Index: " + UVindex + "</p>"
      ); // ◙◙◙◙◙ ⮙ Places UV index in top card
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ BUILDING TOP CARD
      let fiveDay = // ◙◙◙◙◙ ⮘ creating URL for 5 Day weather forecast AJAX Call
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKeyDef;
      $.ajax({
        //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ TERTIARY AJAX CALL, BASED ON LATITUDE/LONGITUDE OF CITY SELECTED BY USER
        url: fiveDay,
        method: "GET",
      }).then(function (response2) {
        console.log(response2); // returns 8 objects for each day...
        console.log(response2.list[0].main.temp);
        console.log(response2.list[0].main.humidity);
        console.log(response2.list[0].weather[0].icon);
        let fiveDay4Cast = Object.values(response2);
        let fiveDayArray = fiveDay4Cast[3].slice(0, 40);
        console.log(fiveDayArray);

        for (let i = 4; i < 40; i+= 8) {
            const card5 = fiveDayArray[i];
            let date5 = card5.dt_txt.slice(5, 10) + "-" + card5.dt_txt.slice(0, 4);
            let icon5 = card5.weather[0].id
            let temperature5 = (card5.main.temp - 273.15) * 1.8 + 32;
            let humidity5 = card5.main.humidity;
            
            let cardSize = $("<div>")
                .addClass("card text-white bg-primary mb-3 wholeCard");
            $("#fiveD").append(cardSize)
            let cardDate = $("<div>")
                .addClass("card-header")
                .text(date5);
            $(".wholeCard").append(cardDate)    
            
            // let cardBody = $("<div>")
            //     .addClass("card-body three");
            // $("")
            // let cardIcon = $("<h5>")
            //     .addClass("cardbody")
            //     .text(icon5);
            // let cardTemperature = $("<h5>")
            //     .addClass("cardbody")
            //     .text(temperature5);
            // let cardHumidity = $("<h5>")
            //     .addClass("cardbody")
            //     .text(humidity5);
            
            
                
            
            

            // $("#fiveD").attr("class", "card text-white bg-primary mb-3").append("<div>")
            // $("#fiveD").attr("class", "card-header").text(date5).append("<div>")
            // $("#fiveD").attr("class", "card-body").append("<div>")
            // $("#fiveD").attr("class", "cardbody").text(icon5).append("<h5>")
            // $("#fiveD").attr("class", "cardbody").text(temperature5).append("<h5>")
            // $("#fiveD").attr("class", "cardbody").text(humidity5).append("<h5>")
            


            
                
            //   ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
            //   $("#fiveD").append(
               
            //   ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
            //   $("#fiveD").append(
                


           console.log(date5)
           console.log(icon5)
           console.log(temperature5)
           console.log(humidity5)

            
        }

         // var fDate5 = element.dt_txt.slice(5, 10) + "-" + element.dt_txt.slice(0, 4);

        // need to pull date
        // icon of weather
        // temp list[0].main.temp
        // humidity for each of the 5 days... list[0].main.humidity
        // focus on 1 object within the object itself

        // var fiveDayForecast = Object.values(response3);
        // // console.log(fiveDayForecast);
        // var targetedF5 = fiveDayForecast[3].slice(0, 40);
        // console.log(targetedF5);
        //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
      });
    });

    // for (var y = 0; y < 40; y+=8) { }
    //     var element = targetedF5[y];

    //  http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

    //   let temp = $("<h3>").text((rspnsArray[3].temp - 273.15) * 1.8 + 32);
    //   let humidity = $("<h3>").text(rspnsArray[3].humidity);
    //   let uvIndex = $("<h3>").text(rspnsArray[3].humidity);

    //   $(".wDeets").append(location, temp, humidity);

    //temp

    //humidity

    //windspeed
    //uv index
  });
});
