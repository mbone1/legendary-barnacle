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
var cityArr = [];

$(".citySearch").click(function walter() {
    let city = $(".cityName").val();

    let queryURL = apiCall + city + "&appid=" + apiKeyDef;



    if (cityArr.includes(city)) {
        return;
        // walter();
    } else {
        // $(".rightCOL").addClass("starthidden");
        $("#ico").remove();
        $("#loc").remove();
        $("#temp").remove();
        $("#hum").remove();
        $("#wS").remove();
        $("#uVin").remove();
        $("#holder").remove();
        cityArr.push(city);
        $(".cities").append(
                "<div>" +
                "</div>" +
                "<div>" +
                "<button class=btn>" +
                city +
                "</button>" +
                "</div>")
            // walter();
        console.log(cityArr);
        localStorage.setItem("Cities", cityArr);

        // $(".rightCOL").removeClass("starthidden");
    }
    $.ajax({
        //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘ INITIAL AJAX CALL, BASED UPON WHATEVER CITY USER HAS ENTERED TO SEARCH UNDER
        url: queryURL,
        method: "GET",
    }).then(function(response) {
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
        console.log(response);
        $.ajax({
            // ◙◙◙◙◙ ⮙ SECONDARY AJAX CALL, BASED ON LATITUDE/LONGITUDE OF CITY SELECTED BY USER
            url: indexUV,
            method: "GET",
        }).then(function(response1) {
            console.log(response1);

            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
            let rspnsArray1 = Object.values(response1); // ◙◙◙◙◙ ⮘ Changes response1 to an array
            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS
            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ CREATING VARIABLES FOR DATA TO APPEND TO PAGE
            let UVindex = rspnsArray1[4]; // ◙◙◙◙◙ ⮘ Pulls UV Index from array
            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ CREATING VARIABLES FOR DATA TO APPEND TO PAGE

            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ BUILDING TOP CARD
            $("#topCard").append("<img id=ico src=" + iconURL + ">"); // ⮘ Places image of current weather conditions to top card
            $("#cBody").append("<h5 id=loc>" + location + "</h5>"); // ⮘ Places current location in top card
            $("#cBody").append(
                "<p id=temp class=card-text>" +
                "Current Temperature: " +
                temperature +
                "°F" +
                "</p>"
            ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
            $("#cBody").append(
                "<p id=hum class=card-text>" + "Humidity: " + humidity + "%" + "</p>"
            ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
            $("#cBody").append(
                "<p id=wS class=card-text>" + "Windspeed: " + windSpeed + "MPH" + "</p>"
            ); // ◙◙◙◙◙ ⮙ Places current temperature in top card
            $("#cBody").append(
                "<p id=uVin class=card-text>" + "UV Index: " + UVindex + "</p>"
            ); // ◙◙◙◙◙ ⮙ Places UV index in top card
            $("#fiveD").append(
                    "<div class=card-deck id=holder></dov>"
                )
                //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ BUILDING TOP CARD

            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ BUILDING URL FOR TERTIARY AJAX
            let fiveDay = // ◙◙◙◙◙ ⮘ creating URL for 5 Day weather forecast AJAX Call
                "http://api.openweathermap.org/data/2.5/forecast?lat=" +
                latitude +
                "&lon=" +
                longitude +
                "&appid=" +
                apiKeyDef;
            //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ BUILDING URL FOR TERTIARY AJAX CALL

            $.ajax({
                //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ TERTIARY AJAX CALL, BASED ON LATITUDE/LONGITUDE OF CITY SELECTED BY USER
                url: fiveDay,
                method: "GET",
            }).then(function(response2) {
                //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS

                let fiveDay4Cast = Object.values(response2);
                let fiveDayArray = fiveDay4Cast[3].slice(0, 40);

                //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ SIMPLIFYING DATA FROM API CALLS/DECLARING VARIABLES FOR API CALLS

                //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ FOR LOOP FOR BUILDING 5 DAY FORECAST
                for (let i = 4; i < 40; i += 8) {
                    const card5 = fiveDayArray[i];
                    let date5 =
                        card5.dt_txt.slice(5, 10) + "-" + card5.dt_txt.slice(0, 4);
                    let icon5 = card5.weather[0].icon;
                    let temperature5 = (card5.main.temp - 273.15) * 1.8 + 32;
                    let temp5 = temperature5.toFixed();
                    let humidity5 = card5.main.humidity;

                    let cardSize = $("<div>").addClass(
                        "card text-white bg-primary mb-3 wholeCard"
                    ).attr("id", "cSi");
                    let cardBody = $("<div>").addClass("card-body").attr("id", "cBody").attr("id", "cBo");
                    let cardDate = $("<p>").attr("class", "card-title").attr("id", "cDa").text(date5);
                    let cardIcon = $("<p>")
                        .attr("class", "card-text")
                        .attr("id", "cIc")
                        .append(
                            "<img src = 'http://openweathermap.org/img/wn/" +
                            icon5 +
                            "@2x.png'>"
                        );
                    let cardTemperature = $("<p>")
                        .attr("class", "card=text")
                        .attr("id", "cTe")
                        .text("Temp: " + temp5 + " °F");
                    let cardHumidity = $("<p>")
                        .attr("class", "card-text")
                        .attr("id", "cHu")
                        .text("Humidity: " + humidity5 + "%");
                    cardBody.append(cardDate, cardIcon, cardTemperature, cardHumidity);
                    $("#holder").append(cardSize);
                    cardSize.append(cardBody)
                        //◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙ BUILDING TOP CARD
                }
            });
        });
    });
});