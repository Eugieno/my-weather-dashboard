

// Create an event handler function that does the following; 
$('#search-button').on('click', function(event) {
    event.preventDefault()
    // sends APi request to Geocoding API
    // Get city name fromm form text 
    // construct an API url with city name as a variable
    var city = $('#search-input').val().trim()
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

        queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon="+ cityLongitude + "&appid=206770210d4f6a044b598977640e699a"

        $.ajax({
            url:queryURL2,
            method: 'GET'
        }).then(function(result) {
            console.log(result)
        })




    })
   
    

    // API ajax call to geocoding API
    // Grab long and lat data from Geocoding response object
        // store long and lat in variables
    // construct ajax call to open whether API using long and latitude data for the corresponding city
        // Append the required info on to the respective section of the front end page
    // Append dynamically new button unto the history div with a new classname
    // send the appended info to local storage
})

    
            

// Write a function to send to local storage 
function sendToLocal() {
    // create user object from on-screen data rendered, remember to trim
    var  localSto = {
        current: {
            city: city,
            date: date1,
            temp: temp1,
            humidity: humidity1
        },
        first: {
            date: date1,
            icon: icon1,
            temp: temp1,
            humidity: humidity1
        },
        second: {
            date: date1,
            icon: icon1,
            temp: temp1,
            humidity: humidity1
        },
        third: {
            date: date1,
            icon: icon1,
            temp: temp1,
            humidity: humidity1
        },
        fouth: {
            date: date1,
            icon: icon1,
            temp: temp1,
            humidity: humidity1
        },
        fifth: {
            date: date1,
            icon: icon1,
            temp: temp1,
            humidity: humidity1
        },
    }
    // send to localstorage using sendItem
    localStorage.setItem("key", JSON.stringify(localSto))
}
    

// write a function that handles the click event on the searched item in the history section
    // Make use of event delegation to id = history and new classname dynamically generated from main event above
function renderHistory() {
    // clear current screen 
    // get item and JSON.parse 
    // print on screen 
}

// write a function to render searched item on the screen 



        // add event listener to the search button of the form element