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
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ BUILDING TOP CARD
    $("#topCard").append("<img src=" + iconURL + ">"); // ⮘ Places image of current weather conditions to top card
    $("#cBody").append("<h5>" + location + "</h5>"); // ⮘ Places current location in top card
    $("#cBody").append(
      "<p class=card-text>" + "Current Temperature: " + temperature + "</p>"
    ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
    $("#cBody").append(
      "<p class=card-text>" + "Humidity: " + humidity + "%" + "</p>"
    ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
    $("#cBody").append(
      "<p class=card-text>" + "Windspeed: " + windSpeed + "MPH" + "</p>"
    ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
    //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ BUILDING TOP CARD
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
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ BUILDING TOP CARD : PART 2
      $("#cBody").append(
        "<p class=card-text>" + "UV Index: " + UVindex + "</p>"
      ); // ◙◙◙◙◙ ⮙ Places UV index in top card
      //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ BUILDING TOP CARD : PART 2
      let fiveDay =  // ◙◙◙◙◙ ⮘ creating URL for 5 Day weather forecast AJAX Call
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
        // need to pull date
        // icon of weather
        // temp
        // humidity for each of the 5 days...
        // focus on 1 object within the object itself

        //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
      });
    });

    //  http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

    // console.log(response);
    // console.log(rspnsArray);
    // console.log(rspnsArrayL2);
    // console.log(rspnsArrayL2[3])
    // console.log(rspnsArrayL3);
    // console.log(latitude);
    // console.log(longitude);
    //console.log(windSpeed)
    // console.log(location);
    // console.log(humidity);
    // console.log(temperature);

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
