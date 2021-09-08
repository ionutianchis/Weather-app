const city = document.querySelector('#cityInput')
const submitBtn = document.querySelector('#submitSearch')

const startDiv = document.querySelector('#startText')
const cityName = document.querySelector('#cityName')
const conditions = document.querySelector('#conditions')
const temp = document.querySelector('#temp')
const feels = document.querySelector('#feelsTemp')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
const sunriseSunset = document.querySelector('#sunriseSunset')

submitBtn.addEventListener('click', () => {
    if (validateForm()) {
        startDiv.style.display = 'none'
        getWeather(city.value)
        updateElements(city.value)
        city.value = ''
    }
})

function convertKelvinToC (num) {
    const res = num - 273.15
    return Number(Math.round(parseFloat(res + 'e' + 1)) + 'e-' + 1)
}

function convertToKm (num) {
    const res = num * 3.6
    return Number(Math.round(parseFloat(res + 'e' + 1)) + 'e-' + 1)
}

function validateForm () {
    if (city.value === '') {
        city.setCustomValidity('Please enter a city !')
        city.reportValidity()
        return false
    } else {
        return true
    }
}

function getDate (val) {
    const date = new Date(val * 1000)
    const hours = date.getHours()
    const minutes = '0' + date.getMinutes()
    const formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
}

async function getWeather (city, country) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=38de46fc2f9c1fc70ff1442b051614bd`, { mode: 'cors' })
        const weatherData = await response.json()
        return weatherData
    } catch (err) {
        alert(err.message)
    }
}

async function updateElements (city) {
    try {
        getWeather(city).then((data) => {
            if (!(data.message)) {
                cityName.textContent = data.name + ', '

                conditions.textContent = data.weather[0].description + ','

                temp.textContent = 'temperature is ' + convertKelvinToC(data.main.temp) + '°C' + ','

                feels.textContent = 'but it feels like ' + convertKelvinToC(data.main.feels_like) + '°C' + ','

                humidity.textContent = 'humidity is at around ' + data.main.humidity + '%' + ', '

                wind.textContent = 'and the wind speed is ' + convertToKm(data.wind.speed) + ' km/h' + ','

                sunriseSunset.textContent = 'sunrise was at ' + getDate(data.sys.sunrise) + ' and sunset at ' + getDate(data.sys.sunset) + '.'
            } else if (data.message) {
                alert(`${city}` + ' ' + data.message)
            }
        })
            .catch((err) => {
                alert(err.message)
            })
    } catch (err) {
        alert(err.message)
    }
}
