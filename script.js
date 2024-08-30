// getting all element!!!!
const apiKey = '484379af6c976a7cbf9fc60daef310d5';
// navigation
const searchBar = document.querySelector('#search-input');
const modeChange = document.querySelector('.switch-input');
const currentLocation = document.querySelector('#location');
const convetor = document.querySelector('#unite')


// unit convert
const unitConvert = (kelvinValue, toUnit) => {
    let convertedValue;

    if (toUnit === 'C') {
        // Convert Kelvin to Celsius
        convertedValue = kelvinValue - 273.15;
    } else if (toUnit === 'F') {
        // Convert Kelvin to Fahrenheit
        convertedValue = (kelvinValue - 273.15) * 9 / 5 + 32;
    } else {
        throw new Error('Invalid unit conversion requested.');
    }

    return Math.round(convertedValue * 100) / 100; // rounding to 2 decimal places
};


// current temperature in card
const currentTemperature = document.querySelector('#current-temperature')
const currentTemperatureImg = document.querySelector('#current-temperature-img')
const currentTemperatureDetails = document.querySelector('#condition')
const currentTemperatureDay = document.querySelector('#current-temper-day');
const currentTemperatureLocation = document.querySelector('#current-temper-location');

const gettingCurrentTemp = (temp, city, tempDetails, weekDay, image,tempUnit) => {
   currentTemperature.innerHTML = `${temp}&deg;${tempUnit}`;
   currentTemperatureLocation.textContent = city; 
   currentTemperatureDetails.textContent = tempDetails;
   currentTemperatureDay.textContent = weekDay
   currentTemperatureImg.src = `images/${image}.png`;
}

// fetching current weather
const currentWeather = async() => {
    try {
         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=udaipur&appid=${apiKey}`
         const response = await fetch(apiUrl);
         const data = await response.json();
        //  console.log(data.name);
        // console.log(data);
        // console.log(data.main.humidity);
        
        // console.log(data.sys.sunset);
        let sunrise =new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let sunset =new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// console.log(sunrise, sunset);
  sunriseTime.textContent = sunrise;
  sunsetTime.textContent = sunset;

        let timestamp = data.dt;
        let date = new Date(timestamp * 1000);
        // console.log(convetor.value);
        let temp = data.main.temp
        let tempUnit;
        let feelsTempr = data.main.feels_like;

        if (convetor.value === 'k/c') {
             value = unitConvert(temp, "C");
             let val2 = unitConvert(feelsTempr,"C")
             feelsTempr = Math.round(val2);
             temp = Math.round(value) 
             tempUnit = "c"
            }
        else if(convetor.value === 'm/f'){
            value = unitConvert(temp, "F");
            temp = Math.round (value)
            let val2 = unitConvert(feelsTempr,"F")
            feelsTempr = Math.round(val2);
            tempUnit = "F"
        }
        // feelsec
   feelTemper.innerHTML = `${feelsTempr}&deg;${tempUnit}`

//    visibility
  let visib = data.visibility;
  let visibVal;
  let visibUnit;

  if (convetor.value === 'k/c') {
      visibVal = visib / 1000
      visibUnit = 'Km'
  }
  else if (convetor.value === 'm/f') {
       visibVal = Math.round(visib * 0.000621371);
       visibUnit = 'mile'
  }

  visibilityDistance.innerHTML = `${visibVal} ${visibUnit}`

//   humidity sec
let humper = data.main.humidity
  humidityPercent.innerHTML = `${humper}%`;

//   presure sec
let prser = data.main.pressure;
perssureVal.innerHTML = `${prser}hPa`


//    current weatehr

       let image = data.weather[0].main;
       let city = data.name;
       let tempDetails = data.weather[0].description
      let weekDay = weekDayName[date.getDay()]
    //    console.log(weekday);
       
  gettingCurrentTemp(temp, city,tempDetails, weekDay, image, tempUnit)
  getcity(city)
  weekForecast(city)

    } catch (error) {
        console.error('error in currentWeather', error);
        
    }
   
    
}
currentWeather()
// addevent listner for changes in units
convetor.addEventListener('change',() => {
    currentWeather();
    //  weekForeCast();
})  
;

// Fetching 5-day weather forecast data
const weekForecast = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; // Clear previous content

        const tempUnit = convetor.value.includes('c') ? 'C' : 'F';
        const speedUnit = convetor.value.includes('k') ? 'km/h' : 'mph';

        // Extract daily data for each day at 12:00 (noon)
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyData.forEach(day => {
            const date = new Date(day.dt_txt);
            const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // Example: 5 Mar
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            let dayTemp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;

            // Convert temperature to Fahrenheit if needed
            if (convetor.value === 'm/f') {
                dayTemp = Math.round(dayTemp * 9 / 5 + 32);
            }

            // Create a row for daily forecast
            const row = document.createElement('div');
            row.classList.add('row');

            row.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}">
                <p class="day-temp">${dayTemp}&deg;${tempUnit}</p>
                <p class="day-date">${formattedDate}</p>
                <p class="week-day">${dayOfWeek}</p>
            `;

            forecastContainer.appendChild(row);
        });

        // Extract 3-hour interval data for the entire day
        const allHourlyData = data.list.filter(item => {
            const hour = new Date(item.dt_txt).getHours();
            return hour === 0 || hour === 3 || hour === 6 || hour === 9 || hour === 12 || hour === 15 || hour === 18 || hour === 21;
        });

        // Ensure we have 8 data points
        const hourlyData = allHourlyData.slice(0, 8);

        // First row: Temperature at 3-hour intervals
        const tempRow = document.createElement('div');
        tempRow.classList.add('onerow');

        hourlyData.forEach(hour => {
            const hourTime = new Date(hour.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(':00', '');
            let hourTemp = Math.round(hour.main.temp);
            const hourIcon = hour.weather[0].icon;

            // Convert temperature to Fahrenheit if needed
            if (convetor.value === 'm/f') {
                hourTemp = Math.round(hourTemp * 9 / 5 + 32);
            }

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${hourTime}</h3>
                <img src="http://openweathermap.org/img/wn/${hourIcon}.png" alt="${hour.weather[0].description}">
                <p>${hourTemp}&deg;${tempUnit}</p>
            `;

            tempRow.appendChild(card);
        });

        // Second row: Wind speed at 3-hour intervals
        const windRow = document.createElement('div');
        windRow.classList.add('torow');

        hourlyData.forEach(hour => {
            const hourTime = new Date(hour.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(':00', '');
            let windSpeed = Math.round(hour.wind.speed);
            const windIcon = 'wind-icon.png'; // Placeholder for wind direction icon

            // Convert wind speed to km/h if needed
            if (convetor.value === 'm/f') {
                windSpeed = Math.round(windSpeed * 3.6);
            }

            // Determine wind direction
            const windDirection = getWindDirection(hour.wind.deg);

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${hourTime}</h3>
                <p>(${windDirection})</p>
                <p>${windSpeed} ${speedUnit}</p>
            `;

            windRow.appendChild(card);
        });

        const fullDay = document.querySelector('.full-day');
        fullDay.innerHTML = '';
        fullDay.appendChild(tempRow);
        fullDay.appendChild(windRow);

    } catch (error) {
        console.error("Error fetching the weather data: ", error);
    }
}

// Helper function to determine wind direction
const getWindDirection = (degree) => {
    if (degree >= 337.5 || degree < 22.5) return 'N';
    if (degree >= 22.5 && degree < 67.5) return 'NE';
    if (degree >= 67.5 && degree < 112.5) return 'E';
    if (degree >= 112.5 && degree < 157.5) return 'SE';
    if (degree >= 157.5 && degree < 202.5) return 'S';
    if (degree >= 202.5 && degree < 247.5) return 'SW';
    if (degree >= 247.5 && degree < 292.5) return 'W';
    if (degree >= 292.5 && degree < 337.5) return 'NW';
}

// todays Highlights
// air quality
const airQuality = document.querySelector('#aircondition');
const airPm = document.querySelector('#air-pm')
const airSo = document.querySelector('#air-SO')
const airCo = document.querySelector('#air-co')
const airO = document.querySelector('#air-O')

// lon/let to city name
const getcity = async(city) => {
try {
    const googlekey = "pk.37c625be3131b157d1640a45bcaae732"
    const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${googlekey}&q=${encodeURIComponent(city)}&format=json&limit=1`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    // console.log(data[0].lat);
    // console.log(data[0].lon);
    
    let lon = data[0].lon;
    let lat = data[0].lat;
    // console.log(longitute,latitute);
    airDetails(lon, lat)
    
    
} catch (error) {
    console.error('error in fetching city name', error);
    
}
}


const airDetails = async(lat, lon) => {
       try {
        const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        // console.log(data.list[0].components.o3);
        

        airCo.innerHTML = data.list[0].components.co;
        airO.innerHTML = data.list[0].components.o3;
        airSo.innerHTML = data.list[0].components.so2;
        airPm.innerHTML = data.list[0].components.pm2_5

       } catch (error) {
        console.error('error in air details', error);
        
       }

}
// sunrise-sunset
const sunriseTime = document.querySelector('#Sunrise-time')
const sunsetTime = document.querySelector('#Sunset-time')

// feel like, section
const feelTemper = document.querySelector('#feel-temper');
// visibility sec
const visibilityDistance = document.querySelector('#visibility-dist');
// humidity sec.
const humidityPercent = document.querySelector('#humidity-percent');
// pressure sec
const perssureVal = document.querySelector('#perssure-val');


    // todays at 
//  after feching
 
// dark mode-light mode switch 
modeChange.addEventListener('click', () => {
    if (modeChange.checked) {
    // console.log("no");
    document.body.classList.add('invert');

    }else{
        document.body.classList.remove('invert')

    }

});
// days month
let weekDayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    'Friday',
    "Saturday",
];
let monthName = [
    'Jan',
    'Fab',
    'Mar',
    'Apr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
// convert function


// feching weather
// const fetchWeather = async () => {
//     try {
//        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=udaipur&appid=${apiKey}`;
//        const response = await fetch(apiUrl);
//        const data = await response.json();   
//        console.log(data);
//     //    let city = data.city.name
       
//     //    gettingCurrentTemp(temp, city, tempDetails, weekDay)
//     } catch (error) {
//         console.log('error in fetchWeather', error)
//     }
// }

// fetchWeather();
