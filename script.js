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

let apiKeyDef = "93b75b830f3da96083a3b6252ba8705b";
let apiCall = "http://api.openweathermap.org/data/2.5/weather?q=";
let apiCallLaLo = "http://api.openweathermap.org/data/2.5/uvi?appid="

// WHEN I search for a city
$(".citySearch").click(function () {
  let city = $(".cityName").val();
  let queryURL = apiCall + city + "&appid=" + apiKeyDef;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
      let rspnsArray = Object.values(response); //turns object into an array
      let rspnsArrayL2 = Object.values(response.weather[0]);//
      let rspnsArrayL3 = Object.values(laLo.value);//need to fix this start
      let location = $("<h3>").text(rspnsArray[11]);
      let temp = $("<h3>").text((rspnsArray[3].temp - 273.15) * 1.8 + 32);
      let humidity = $("<h3>").text(rspnsArray[3].humidity);
      let uvIndex = $("<h3>").text(rspnsArray[3].humidity);
      let lat = rspnsArray[0].lat; 
      let lon = rspnsArray[0].lon; 
      console.log(lat)
      console.log(lon)
      console.log(rspnsArray)
      console.log(rspnsArrayL2)
      console.log(rspnsArrayL3)
      $(".wDeets").append(location, temp, humidity);
      
      let laLo = apiCallLaLo + apiKeyDef + "&lat=" + lat + "&lon=" + lon;

    //  http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

    $.ajax({
       url: laLo,
       method: "GET",
     }).then(function (response) {
    console.log(response)
    
    
    
    //     $.ajax({
    //      url: queryURL,
    //      method: "GET",
    //   }).then(function (response) {});
    });

    //temp

    //humidity

    //windspeed
    //uv index
  });
});
