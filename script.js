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

const gettingCurrentTemp = (temp, city, tempDetails, weekDay, image) => {
   currentTemperature.innerHTML = `${temp}&deg;c`;
   currentTemperatureLocation.textContent = city; 
   currentTemperatureDetails.textContent = tempDetails;
   currentTemperatureDay.textContent = weekDay
   currentTemperatureImg.src = `imagesgit/${image}.png`;
}

// fetching current weather
const currentWeather = async() => {
    try {
         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=udaipur&appid=${apiKey}`
         const response = await fetch(apiUrl);
         const data = await response.json();
        //  console.log(data.name);
        console.log(data);
        let timestamp = data.dt;
        let date = new Date(timestamp * 1000);
        // console.log(convetor.value);
       let temp = data.main.temp
        
        if (convetor.value === 'k/c') {
             value = unitConvert(temp, "C");
             temp = Math.floor(value) 
            }
        else{
            value = unitConvert(temp, "F");
            temp = Math.floor(value)
        }
 
       let image = data.weather[0].main;
       let city = data.name;
       let tempDetails = data.weather[0].description
      let weekDay = weekDayName[date.getDay()]
    //    console.log(weekday);
       
  gettingCurrentTemp(temp, city,tempDetails, weekDay, image)

    } catch (error) {
        console.error('error in currentWeather', error);
        
    }
   
    
}
currentWeather()
// 5 days foreCast
// we will create this after fetching

// todays Highlights
// air quality
const airQuality = document.querySelector('#aircondition');
const airPM = document.querySelector('#air-pm')
const airSO = document.querySelector('#air-SO')
const airNO = document.querySelector('#air_NO')
const airO = document.querySelector('#air-O')

// sunrise-sunset
const sunriseTime = document.querySelector('Sunrise-time')
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
