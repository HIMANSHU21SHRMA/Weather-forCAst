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
        console.log(data);
        console.log(data.main.feels_like);
        
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
   feelTemper.innerHTML = `${feelsTempr}&deg;${tempUnit}`
       let image = data.weather[0].main;
       let city = data.name;
       let tempDetails = data.weather[0].description
      let weekDay = weekDayName[date.getDay()]
    //    console.log(weekday);
       
  gettingCurrentTemp(temp, city,tempDetails, weekDay, image, tempUnit)
  getcity(city)

    } catch (error) {
        console.error('error in currentWeather', error);
        
    }
   
    
}
currentWeather()
// addevent listner for changes in units
convetor.addEventListener('change',() => {
    currentWeather();
     weekForeCast();
})
;

// Fetching 5-day weather forecast data
const weekForeCast = async () => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=udaipur&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const forecastContainer = document.querySelector('#forecast-container');
        forecastContainer.innerHTML = ''; // Clear any existing content

        // Process and display the forecast for 5 days
        const dailyForecasts = {};
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toISOString().split('T')[0]; 

            if (!dailyForecasts[day]) {
                dailyForecasts[day] = forecast; 
            }
        });

        const days = Object.keys(dailyForecasts).slice(0, 5);

        days.forEach(day => {
            const forecast = dailyForecasts[day];
            const date = new Date(forecast.dt * 1000);
            let dayTemp = forecast.main.temp; 
          
            if (convetor.value === 'm/f') {
                // Convert Celsius to Fahrenheit
                dayTemp = Math.round((dayTemp * 9/5) + 32);
                // tempUnit = "F";
            } else if (convetor.value === 'k/c') {
                dayTemp = Math.round(dayTemp)
          
            }
            const weekDay = weekDayName[date.getDay()]; // Day of the week
            const dayDate = `${date.getDate()} ${monthName[date.getMonth()]}`; // Date and month
            const weatherImage = forecast.weather[0].main.toLowerCase(); 
            // console.log(weatherImage);
            // Weather condition image (e.g., rain)
             
            // Create the row and populate it
            const row = document.createElement('div');
            row.classList.add('row');

            row.innerHTML = `
                <img src="images/${weatherImage}.png" alt="${weatherImage}">
                <p class="day-temp">${dayTemp}&deg;</p>
                <p class="day-date">${dayDate}</p>
                <p class="week-day">${weekDay}</p>
            `;

            // Append the row to the forecast container
            forecastContainer.appendChild(row);
        });

    } catch (error) {
        console.error('Error in weekForeCast:', error);
    }
}
weekForeCast();


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
