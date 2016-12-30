/* Uses APIs of OpenWeatherMap and IP Geolocation */
$(document).ready(function(){
  /* First, get IP geo-coordinates */
  $.getJSON("https://ip-api.com/json", function(coords){
    var lat = coords.lat;
    var long = coords.lon;
    var city = coords.city;
    var region = coords.regionName;
    var country = coords.country;
    $("#location").html(""+city+", "+region+", "+country);
    /* Next, use coords to get weather data */
    var owmKey = "56b82012d59734fb72562b33066806b4"; // unique app key
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?";
    $.getJSON(apiURL+"lat="+lat+"&lon="+long+"&APPID="+owmKey, function(data){

      /* Determine general weather type */
      var weather = data.weather[0].main;
      var condition = data.weather[0].description;
      $("#weather").html("Contains "+condition);

      /* Determine weather icon*/
      var icon;
      var id = data.weather[0].id;
      var timeNow = data.dt;  // All time vars are in UNIX
      var sunRise = data.sys.sunrise;
      var sunSet = data.sys.sunset;

      // Test statements:
      //weather="Extreme";
      //id = 904;
      // ^^End of test statements

      if (timeNow >= sunRise && timeNow < sunSet) { // day
        if (id < 300){
          icon = "11d.png";
        } else if ((id >= 300 && id <= 321)||(id >= 520 && id <= 531)){
          icon = "09d.png";
        } else if (id >= 500 && id <= 504){
          icon = "10d.png";
        } else if (id === 511 || (id >= 600 && id <= 622)){
          icon = "13d.png";
        } else if (id >= 701 && id <= 781){
          icon = "50d.png";
        } else if (id === 800){
          icon = "01d.png";
        } else if (id === 801){
          icon = "02d.png";
        } else if (id === 802){
          icon = "03d.png";
        } else if (id === 803 || id === 804){
          icon = "04d.png";
        } else {
          icon = "50d.png";
        }
      } else {  // night
        if (id < 300){
          icon = "11n.png";
        } else if ((id >= 300 && id <= 321)||(id >= 520 && id <= 531)){
          icon = "09n.png";
        } else if (id >= 500 && id <= 504){
          icon = "10n.png";
        } else if (id === 511 || (id >= 600 && id <= 622)){
          icon = "13n.png";
        } else if (id >= 701 && id <= 781){
          icon = "50n.png";
        } else if (id === 800){
          icon = "01n.png";
        } else if (id === 801){
          icon = "02n.png";
        } else if (id === 802){
          icon = "03n.png";
        } else if (id === 803 || id === 804){
          icon = "04n.png";
        } else {
          icon = "50n.png";
        }
      }
      var iconURL = "https://openweathermap.org/img/w/"+icon;
      $("#icon").attr("src", iconURL);

      /* Determine background image */
      if (weather === "Rain") {
        $("body").css("background-image", "url(https://webneel.com/wallpaper/sites/default/files/images/04-2013/Rainy-Weather_2.jpg)");
      } else if (weather === "Snow") {
        $("body").css("background-image", "url(https://www.wallpaperup.com/uploads/wallpapers/2013/01/07/28265/big_thumb_a37ef69062c8eccadcd03fa1b7d46bf7.jpg)");
      } else if (weather === "Thunderstorm") {
        $("body").css("background-image", "url(https://static.pexels.com/photos/56614/lightning-storm-night-firebird-56614-large.jpeg)");
      } else if (weather === "Drizzle") {
        $("body").css("background-image", "url(https://static.pexels.com/photos/24435/pexels-photo-24435-large.jpg)");
      } else if (weather === "Atmosphere") {
        $("body").css("background-image", "url(https://static.pexels.com/photos/48678/pexels-photo-48678-large.jpeg)");
      } else if (weather === "Clear") {
        $("body").css("background-image", "url(https://static.pexels.com/photos/5055/sea-sky-beach-holiday-large.jpeg)");
      } else if (weather === "Clouds") {
        $("body").css("background-image", "url(https://static.pexels.com/photos/113/sky-clouds-cloudy-weather-large.jpg)");
      } else {  // Extreme conditions
        switch(id){
          case 900: // tornado
            $("body").css("background-image", "url(https://sites.psu.edu/nidzynrclblog1314/wp-content/uploads/sites/4984/2013/10/tornado-wallpaper1366x76858676.jpg)");
            break;
          case 901: // tropical storm
            $("body").css("background-image", "url(https://belizeadventure.com/wp-content/uploads/2013/04/northern-storm-2003.jpg)");
            break;
          case 902: // hurricane
            $("body").css("background-image", "url(https://i.ytimg.com/vi/jNU1n1nIl-Y/maxresdefault.jpg)");
            break;
          case 903: // cold snap
            $("body").css("background-image", "url(https://static.pexels.com/photos/4187/frozen-ice-window-large.jpg)");
            break;
          case 904: // heat wave
            $("body").css("background-image", "url(https://static.pexels.com/photos/55367/pexels-photo-55367-large.jpeg)");
            break;
          case 905: // windy
            $("body").css("background-image", "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UiC3zVBeIjBaz1nFFkXeOH04wi_CSkEReePOinBgFXPMneM_Tw)");
            break;
          case 906: // hail
            $("body").css("background-image", "url(https://idaniswriting.files.wordpress.com/2011/03/hailstones_uk.jpg)");
            break;
          default:

        }
      }

      /* Determine temperature */
      var tempK = Math.round(data.main.temp); // Kelvin is the default
      var tempC = tempK - 273;  // Celsius
      var tempF = 1.8 * (tempC) + 32; // Fahrenheit
      $("#temp").html(""+tempF+"&deg; F");
      var fActive = true; // Fahrenheit flag
      $("button").on("click", function(){
        if (fActive){
          $("#temp").html(""+tempC+"&deg; C");
          fActive = false;
        } else {
          $("#temp").html(""+tempF+"&deg; F");
          fActive = true;
        }
      });
    });
  });

});
