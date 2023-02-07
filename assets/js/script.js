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
    // $("#buttons-view").empty();
    $('#today').empty()
    $('.forecast-box').text('')
    

    // sends APi request to Geocoding API
    // Get city name fromm form text 
    // construct an API url with city name as a variable
    var city = $('#search-input').val().trim()
    if (city == "") {
        alert("Sorry, text box cannot be empty!")
    }

    apiKey = "6ba0b25bc07a2f8bbcb23b35a7bf0c21"
    queryURL1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid=" + apiKey

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        console.log(response)   /////

        var cityLongitude = response[0].lon 
        var cityLatitude = response[0].lat

        console.log(cityLatitude, cityLongitude)   //////
         // API ajax call to geocoding API
        // Grab long and lat data from Geocoding response object
            // store long and lat in variables
        // construct ajax call to open whether API using long and latitude data for the corresponding city
            // Append the required info on to the respective section of the front end page
        var unit = "metric"
        var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon="+ cityLongitude + "&units="+ unit + "&appid=6ba0b25bc07a2f8bbcb23b35a7bf0c21"

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
            var liveDtTxt = moment().format('YYYY-MM-DD') + " 12:00:00"

            var baseDtTxt = arrayOfData[0].dt_txt
            console.log("base = "+baseDtTxt)

            
            var date = baseDtTxt.split(" ")[0]
            var time = baseDtTxt.split(" ")[1]
            var myMomentObject = moment(date).add(1,'d').format('YYYY-MM-DD') + ` ${time}`
           

           
            formatTime = moment(time, 'HH:mm:ss').add(5,'d').subtract(3, 'h').toString()

            var lastTime = formatTime.split(' ')[4]
            
            console.log(lastTime)
            console.log(myMomentObject)
            console.log(time);

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
                    
                }
            }
        })




    })
   
    

   
    // Append dynamically new button unto the history div with a new classname
    // send the appended info to local storage
})

    
            

// Write a function to send to local storage 
// function sendToLocal() {
//     // create user object from on-screen data rendered, remember to trim
//     var  localSto = {
//         current: {
//             city: city,
//             date: date1,
//             temp: temp1,
//             humidity: humidity1
//         },
//         first: {
//             date: date1,
//             icon: icon1,
//             temp: temp1,
//             humidity: humidity1
//         },
//         second: {
//             date: date1,
//             icon: icon1,
//             temp: temp1,
//             humidity: humidity1
//         },
//         third: {
//             date: date1,
//             icon: icon1,
//             temp: temp1,
//             humidity: humidity1
//         },
//         fouth: {
//             date: date1,
//             icon: icon1,
//             temp: temp1,
//             humidity: humidity1
//         },
//         fifth: {
//             date: date1,
//             icon: icon1,
//             temp: temp1,
//             humidity: humidity1
//         },
//     }
//     // send to localstorage using sendItem
//     localStorage.setItem("key", JSON.stringify(localSto))
// }
    

// write a function that handles the click event on the searched item in the history section
    // Make use of event delegation to id = history and new classname dynamically generated from main event above
// function renderHistory() {
//     // clear current screen 
//     // get item and JSON.parse 
//     // print on screen 
// }

// write a function to display weather data 

// function displayMovieData({ Title, Year, Plot }) {
  
//     // let { Title, Year, Plot } = response;  // obj destructuring 

//   // Template literal below (String Interpolation)
//     let indMovieDiv = $('<div>');
//     indMovieDiv.html(`
//     <h1> ${Title} </h1>
//     <h2> ${Year}</h2>
//     <h3> ${Plot}</h3>
//     `)
//     $('.movie-info').append(indMovieDiv);
//   }

  function displayTodayData(arrayItem, cityName, placementId,n) {
    var todayDataWrap = $('<div>')
    todayDataWrap.html(`
    <h2> ${cityName} ${moment().add(n,'d').format('l')}</h2>
    <p> Temp: ${arrayItem.main.temp}</p>
    <p> Wind: ${arrayItem.wind.speed}
    <p> Humidity: ${arrayItem.main.humidity}
    `)
    // $("#today").append(todayDataWrap)
    placementId.append(todayDataWrap)

  }

  function displaythisData(arrayItem, cityName, placementId,n) {
    var todayDataWrap = $('<div class = "forecast-box">')
    todayDataWrap.html(`
    <h5> ${moment().add(n,'d').format('l')}</h5>
    <p> Temp: ${arrayItem.main.temp}</p>
    <p> Wind: ${arrayItem.wind.speed}
    <p> Humidity: ${arrayItem.main.humidity}
    `)
    // $("#today").append(todayDataWrap)
    placementId.append(todayDataWrap)
  }


  var a = moment([2007, 0, 29]);
  var b = moment([2007, 0, 28]);
  console.log(a.diff(b, 'days'))// 1
  console.log(b.diff(a, 'days'))


  function getMoment(someDtTxt) {
    someDtTxt.split(" ")[0]
    // date = myArr[0]
    // date.add(num, 'd') + myArr[1]
  }
 
  
        // add event listener to the search button of the form element