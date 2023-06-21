const api_key = "f064a082d05edbbddf41d7254c8176ed";
const base_url = "https://api.openweathermap.org/data/2.5/";

const inputSearchBar = document.getElementById("city");
inputSearchBar.addEventListener("keypress", fetchWeather);
function fetchWeather(e) {
  const city = document.getElementById("city").value;
  if (e.key == "Enter") {
    fetch(`${base_url}weather?q=${city}&units=metric&APPID=${api_key}`)
      .then((res) => {
        return res.json();
      })
      .then(setResults);
  }
}
function convertTime(timestamp) {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  let period = "AM";

  if (hours > 12) {
    hours -= 12;
    period = "PM";
  } else if (hours === 0) {
    hours = 12;
  } else if (hours === 12) {
    period = "PM";
  }

  hours = hours.toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds} ${period}`;
}

function setResults(results) {
  const backGround = document.getElementById("main");
  const weatherDataElement = document.getElementById("weather");

  weatherResult = results;

  console.log(weatherResult, "json");
  if (weatherResult.name === undefined) {
    // If weatherResult.name is undefined, hide the card element and show the error element
    weatherDataElement.classList.remove("card");
    weatherDataElement.classList.add("error");
    const warning = weatherResult.message;
    const status = weatherResult.cod;
    const html = ` 
    <div class="error">
        <h2> ${status}</h2>
        <p>${warning}</p>
          <p>Please enter a valid city name.</p>

      </div>`;
    weatherDataElement.innerHTML = html;
    backGround.classList.remove(
      "sunny",
      "rainy",
      "warm",
      "cold",
      "hazy",
      "cloudy"
    );
  } else {
    const cityName = weatherResult.name;
    const countryName = weatherResult.sys.country;
    const sunRise = convertTime(weatherResult.sys.sunrise);
    const sunSet = convertTime(weatherResult.sys.sunset);

    //date
    const date = new Date(weatherResult.dt * 1000);
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    const formatter = new Intl.DateTimeFormat(undefined, options);

    const formattedDate = formatter.format(date);
    const temp = weatherResult.main.temp;
    const langitude = weatherResult.coord.lon;
    const lotitude = weatherResult.coord.lat;
    const feelsLike = weatherResult.main.feels_like;
    const minTemp = weatherResult.main.temp_min;
    const maxTemp = weatherResult.main.temp_max;
    const hum = weatherResult.main.humidity;
    const pressure = weatherResult.main.pressure;
    const windSpeed = weatherResult.wind.speed;
    const windDirection = weatherResult.wind.deg;
    const weatherType = weatherResult.weather[0].main;
    const weatherDescription = weatherResult.weather[0].description;

    const html = `
  <div class="card">
  <div class="heading">
  <h2>${cityName}, ${countryName} Weather</h2>
    <p class="date">Updated on ${formattedDate} </p>
  </div>
  <div class="flex">
  <p >Langitude: ${langitude}°N </p>
   <p >Latitude: ${lotitude}°N </p>
  </div>

 <div class="temp">
 <div class="items">
 <h3> ${temp}°C </h3>
    <p > ${weatherDescription} </p>
</div>

<p class="feels">Feels Like<br> ${feelsLike}°C </p>
  </div>
  <div class="flex">
  <p class="date">Min Temp: ${minTemp}°C </p>
   <p class="date">Max Temp: ${maxTemp}°C </p>
  </div>
<div class="sun">
<p>
	<svg fill=" #f5140c" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke=" #f5140c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23,16a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,16Zm-5,5a1,1,0,0,0,0-2H6a1,1,0,0,0,0,2ZM7,12a1,1,0,0,0,2,0,3,3,0,0,1,6,0,1,1,0,0,0,2,0A5,5,0,0,0,7,12Zm4-7a1,1,0,0,0,2,0V4a1,1,0,0,0-2,0Zm7,7a1,1,0,0,0,1,1h1a1,1,0,0,0,0-2H19A1,1,0,0,0,18,12ZM4,11a1,1,0,0,0,0,2H5a1,1,0,0,0,0-2ZM5.636,5.636a1,1,0,0,0,0,1.414l.707.707A1,1,0,0,0,7.757,6.343L7.05,5.636A1,1,0,0,0,5.636,5.636Zm11.314,0-.707.707a1,1,0,1,0,1.414,1.414l.707-.707A1,1,0,1,0,16.95,5.636Z"></path></g></svg> <span>${sunRise}</span> </p>
    <p><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none" stroke="#f5140c">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <path d="M4 18H2M6.31412 12.3141L4.8999 10.8999M17.6858 12.3141L19.1 10.8999M22 18H20M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M22 22H2M16 5L12 9M12 9L8 5M12 9V2" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
</svg>
 <span>${sunSet}</span>
  </p>
</div>
    
<div class="flex">
   <p class="date">Humidity: ${hum}% </p>
    <p class="date">Atmospheric pressure: ${pressure}hPa </p>
 </div>
    <div class="flex">
    <p class="date">Wind Speed: ${windSpeed} m/sec </p>
    <p class="date">Wind direction: ${windDirection}° </p>
  </div>
    </div>
   
`;
    weatherDataElement.innerHTML = html;
    backGround.classList.remove(
      "sunny",
      "cloudy",
      "rainy",
      "warm",
      "cold",
      "hazy"
    );

    // Add the appropriate weather type class
    if (weatherType === "Clear") {
      backGround.classList.add("sunny");
      backGround.classList.remove("cloudy", "rainy", "warm", "cold", "hazy");
    } else if (weatherType === "Clouds") {
      backGround.classList.add("cloudy");
      backGround.classList.remove("sunny", "rainy", "warm", "cold", "hazy");
    } else if (weatherType === "Warm") {
      backGround.classList.add("warm");
      backGround.classList.remove("sunny", "cloudy", "rainy", "cold", "hazy");
    } else if (weatherType === "Haze") {
      backGround.classList.add("hazy");
      backGround.classList.remove("sunny", "cloudy", "rainy", "warm", "cold");
    } else if (weatherType === "Rain") {
      backGround.classList.add("rainy");
      backGround.classList.remove("sunny", "cloudy", "warm", "cold", "hazy");
    } else if (weatherType === "Cold") {
      backGround.classList.add("cold");
      backGround.classList.remove("sunny", "cloudy", "rainy", "warm", "hazy");
    }
  }
}

function fetchWeatherData() {
  fetch(`${base_url}weather?q=Dhaka&units=metric&APPID=${api_key}`)
    .then((res) => {
      console.log(res, "Static");
      return res.json();
    })
    .then(setResults);
}

fetchWeatherData();

// Call the API every 5 minutes (adjust the interval as needed)
// setInterval(fetchWeatherData, 5 * 60 * 1000); // 5 minutes in milliseconds
