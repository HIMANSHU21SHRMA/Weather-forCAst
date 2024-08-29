// getting all element!!!!
// navigation
const searchBar = document.querySelector('#search-input');
const modeChange = document.querySelector('.switch-input');
const currentLocation = document.querySelector('#location');

// current temperature in card
const currentTemperature = document.querySelector('#current-temperature')
const currentTemperatureImg = document.querySelector('#current-temperature-img')
const currentTemperatureDetails = document.querySelector('#condition')
const currentTemperatureDay = document.querySelector('#current-temper-day');
const currentTemperatureLocation = document.querySelector('#current-temper-location');

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
    document.body.classList.add('invert')
        
    }else{
        document.body.classList.remove('invert')

    }

});

