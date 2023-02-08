// Global id selectors for element
var todayWhetherContEl = $('#today')
var firstForecastCont = $('#forecast-1')
var secForecastCont = $('#forecast-2')
var trdForecastCont = $('#forecast-3')
var fthForecastCont = $('#forecast-4')
var fifthForecastCont = $('#forecast-5')


// Create an event handler function that does the following; 
$('#search-button').on('click', function(event) {
    event.preventDefault()
    
    $('#today').empty()
    $('.forecast-box').text('')
    
    
    var city = $('#search-input').val().trim()
    // validating user input 
    if (city == "") {
        alert("Sorry, text box cannot be empty!")
    }
    // constructing a GET request to Geocoding API
    apiKey = "6ba0b25bc07a2f8bbcb23b35a7bf0c21"
    queryURL1 = "https://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid=" + apiKey

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        console.log(response)   /////

        var cityLongitude = response[0].lon 
        var cityLatitude = response[0].lat

        console.log(cityLatitude, cityLongitude)   //////
        // constructing a GET request to openweather API
        var unit = "metric"
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon="+ cityLongitude + "&units="+ unit + "&appid=6ba0b25bc07a2f8bbcb23b35a7bf0c21"

        $.ajax({
            url:queryURL2,
            method: 'GET'
        }).then(function(result) {
            console.log(result)

            $('#today').removeClass('hide')
            $('#forecast').removeClass('hide')
            $('#forecastHeading').removeClass('hide')
            // Today's weather data
            var arrayOfData = result.list  //array of useful data
            

            var baseDtTxt = arrayOfData[0].dt_txt
            console.log("base = "+baseDtTxt)

            
            var date = baseDtTxt.split(" ")[0]
            var time = baseDtTxt.split(" ")[1]
           
            var formatTime = moment(time, 'HH:mm:ss').add(5,'d').subtract(3, 'h').toString()

            var lastTime = formatTime.split(' ')[4]
            
            console.log(lastTime)
            // console.log(time);
            var nameOfcity = result.city.name
            console.log(arrayOfData)
            console.log(moment().add(3, 'd').format('YYYY-MM-DD'))

            for (var i = 0; i < arrayOfData.length; i++) {
                if (arrayOfData[i].dt_txt == moment(date).add(0,'d').format('YYYY-MM-DD') + ` ${time}`) {
                    var item = arrayOfData[0]
                    displayTodayData(item, nameOfcity,todayWhetherContEl,0)
                }

                if (arrayOfData[i].dt_txt == moment(date).add(1,'d').format('YYYY-MM-DD') + ` ${time}`) {
                    console.log("This is the 1st day forecast")
                    var item = arrayOfData[i]
                    displaythisData(item, nameOfcity,firstForecastCont,1)
                    
                }

                if (arrayOfData[i].dt_txt == moment(date).add(2,'d').format('YYYY-MM-DD') + ` ${time}`) {
                    console.log("This is the 2nd day forecast")
                    var item = arrayOfData[i]
                    displaythisData(item, nameOfcity,secForecastCont,2)
                    
                }

                if (arrayOfData[i].dt_txt == moment(date).add(3,'d').format('YYYY-MM-DD') + ` ${time}`) {
                    console.log("This is the 3rd day forecast")
                    var item = arrayOfData[i]
                    displaythisData(item, nameOfcity,trdForecastCont,3)
                    
                }

                if (arrayOfData[i].dt_txt == moment(date).add(4,'d').format('YYYY-MM-DD') + ` ${time}`) {
                    console.log("This is the 4th day forecast")
                    var item = arrayOfData[i]
                    displaythisData(item, nameOfcity,fthForecastCont,4)
                    
                }

                if (arrayOfData[i].dt_txt == moment(date).add(5,'d').format('YYYY-MM-DD') + ` ${lastTime}`) {
                    console.log("This is the 5th day forecast")
                    var item = arrayOfData[i]
                    displaythisData(item, nameOfcity,fifthForecastCont,5)
                    
                // } else {
                //     // var todayDataWrap = $('<div class = "forecast-box">')
                //     // todayDataWrap.html(`<p id ="no-data-msg">Weather data will be available shortly</p>`)
                //     // fifthForecastCont.append(todayDataWrap)
                //     fifthForecastCont.html(`<p id ="no-data-msg">Weather data will be available shortly</p>`)
                    
                }
            }

            // Append dynamically new button unto the history div and send to client local storage
            renderSearchedQuery()
            sendToLocal()
        })
    })
})

// A function that renders search buttons containing seached query unto the search history 
function renderSearchedQuery() {
    // grab searched text
    var searchText = $('#search-input').val().trim()
    // create a new button element, add text = searched text
    var btnEl = $('<button>').addClass('searchQuery').text(searchText)
    // append the button unto the search element with id = history
    $('#history').append(btnEl)
}
            

// A function to send searched data to local storage 
function sendToLocal() {
    var  localSto = {
                current: todayWhetherContEl.html().trim(),
                first: firstForecastCont.html().trim(),
                second: secForecastCont.html().trim(),
                third: trdForecastCont.html().trim(),
                fouth: fthForecastCont.html().trim(),
                fifth: fifthForecastCont.html().trim()
            }
    accessKey = $('#search-input').val().trim()
    localStorage.setItem(accessKey, JSON.stringify(localSto));
}

// Code structure that allows searched weather info to be retrieved from
// local storage for re-rendering by clicking the specifc button in search history
$('#history').on('click', '.searchQuery', function() {
    $('#today').empty()
    $('.forecast-box').text('')
    

    var fromLocal = JSON.parse(localStorage.getItem($(this).text()))
    console.log("I'm working!")
    console.log($(this).text())
    todayWhetherContEl.append(fromLocal.current)
    firstForecastCont.append(fromLocal.first)
    secForecastCont.append(fromLocal.second)
    trdForecastCont.append(fromLocal.third)
    fthForecastCont.append(fromLocal.fouth)
    fifthForecastCont.append(fromLocal.fifth)
})

// A function that grabs and display the current day weather data
  function displayTodayData(arrayItem, cityName, placementId,n) {
    var todayDataWrap = $('<div>')
    todayDataWrap.html(`
    <h2> ${cityName} ${moment().add(n,'d').format('l')}  <img src= "http://openweathermap.org/img/wn/${arrayItem.weather[0].icon}@2x.png"></h2>
    <p> Temp: ${arrayItem.main.temp}</p>
    <p> Wind: ${arrayItem.wind.speed}
    <p> Humidity: ${arrayItem.main.humidity}
    `)
    placementId.append(todayDataWrap)

  }

// A function that grabs and display 5 day forecast weather data
  function displaythisData(arrayItem, cityName, placementId,n) {
    var todayDataWrap = $('<div class = "forecast-box">')
    todayDataWrap.html(`
    <h5> ${moment().add(n,'d').format('l')}</h5>
    <img src= "http://openweathermap.org/img/wn/${arrayItem.weather[0].icon}@2x.png">
    <p> Temp: ${arrayItem.main.temp}</p>
    <p> Wind: ${arrayItem.wind.speed}
    <p> Humidity: ${arrayItem.main.humidity}
    `)
    placementId.append(todayDataWrap)
  }
