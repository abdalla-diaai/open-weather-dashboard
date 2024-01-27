var todayDiv = $('#today');
var forecastDiv = $('#forecast-cards');
// array for weather condition emojis
var weatherCondition = ['☀︎', '⛅︎', '☔︎', '❅']
// general variables for interacting with page
var temp;
var wind;
var humidity;
var weatherDiv;
var weatherBody;
var weatherInfo;
var weatherUl;
var tempLi;
var windLi;
var humidityLi;
var condition;
var today;
var forecastDay;



// function to render history buttons
function renderButtons() {
    var historyArray = JSON.parse(localStorage.getItem('history'));
    if (historyArray) {
        for (const [key, value] of Object.entries(historyArray)) {
            var historyBtn = $('<button>');
            historyBtn.addClass('city btn btn-info');
            historyBtn.attr('data-name', key);
            $('#history').prepend(historyBtn);
            historyBtn.text(value);
        };
    };
};

// function to save city to local storage
function saveCity(city) {
    // to traverse DOM from parent time block to children textarea
    if (!searchHistory) {
        var searchHistory = {};
    };
    // get stored events if existent
    storedEvents = JSON.parse(localStorage.getItem('history'));
    if (storedEvents !== null) {
        searchHistory = storedEvents;
    };
    searchHistory[city] = city;
    localStorage.setItem('history', JSON.stringify(searchHistory));
};

// function to check whether the city is in the history to avoid duplicating buttons
function checkHistory(cityName) {
    var currentHistory = JSON.parse(localStorage.getItem('history'));
    if (currentHistory !== null) {
        if (currentHistory.hasOwnProperty(cityName)) {
            return true;
        };
    };
    return false;
};

// function to create cards for the specific day weather
function createCard(date, dateFormat, wDiv, cityName) {
    var displayText;
    weatherDiv = $('<div>');
    wDiv.append(weatherDiv);
    weatherInfo = $('<h5>');
    if (date === 'today') {
        weatherDiv.attr('class', 'card');
        today = dateFormat;
        displayText = `${cityName.charAt(0).toUpperCase() + cityName.slice(1)} (${today})`;
    };
    if (date === 'forecast') {
        forecastDay = dateFormat;
        displayText = forecastDay.toLocaleDateString();
        weatherDiv.attr('class', 'card col');
    };
    if (condition === 'Clear') {
        weatherInfo.text(`${displayText} ${weatherCondition[0]}`);

    } else if (condition === 'Clouds') {
        weatherInfo.text(`${displayText} ${weatherCondition[1]}`);
    } else if (condition === 'Rain') {
        weatherInfo.text(`${displayText} ${weatherCondition[2]}`);
    } else if (condition === 'Snow') {
        weatherInfo.text(`${displayText} ${weatherCondition[3]}`);
    }
    $('#forecast-heading').text('4-Day Forecast');
    weatherInfo.attr('class', 'card-title');
    weatherDiv.append(weatherInfo);
    weatherBody = $('<div>');
    weatherBody.attr('class', 'card-body');
    weatherDiv.append(weatherBody);
    weatherUl = $('<ul>');
    weatherUl.attr('class', 'card-text');
    tempLi = $('<li>');
    windLi = $('<li>');
    humidityLi = $('<li>');
    weatherUl.append(tempLi);
    weatherUl.append(windLi);
    weatherUl.append(humidityLi);
    weatherBody.append(weatherUl);

    tempLi.text(`Temperature: ${temp}ºC.`);
    windLi.text(`Wind Speed: ${wind} mps.`);
    humidityLi.text(`Humidity: ${humidity}%.`);
};

// function to process form and fetch data
function processForm(city) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba14af29e70b969c97f97a7190344c26`
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecast = dayjs().add(1, 'day');
            temp = data.list[0].main.temp;
            wind = data.list[0].wind.speed;
            humidity = data.list[0].main.humidity;
            condition = data.list[0].weather[0].main;
            createCard('today', dayjs().format('DD/MM/YYYY'), todayDiv, city);

            for (var i = 8; i < data.list.length; i += 8) {
                temp = data.list[i].main.temp;
                wind = data.list[i].wind.speed;
                humidity = data.list[i].main.humidity;
                condition = data.list[i].weather[0].main;


                createCard('forecast', new Date(data.list[i].dt_txt), forecastDiv);
            };
            // add city to history
            if (!checkHistory(city)) {
                var cityBtn = $('<button>');
                cityBtn.addClass('city btn btn-info');
                cityBtn.attr('data-name', city);
                $('#history').prepend(cityBtn);
                cityBtn.text(city);
                saveCity(city);
            };
        })
        .catch(error => {
            alert('City Does not Exist!');
        });
    // clear input field
    $('#search-input').val('');

};

// event listners -->
// form event
$('#search-form').on('submit', function (event) {
    event.preventDefault();
    todayDiv.empty();
    forecastDiv.empty();
    city = $('#search-input').val();
    // capitalise first letter if lower case and handle uppercase
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    // handle empty form and city searched before
    if (city && !checkHistory(city)) {
        processForm(city);
    } else if (checkHistory(city)) {
        alert('City Exists in History!');
    } else {
        alert('Invalid Input!');
    };
});


// click events to add functionality to history buttons
$(document).on('click', '.city', function () {
    todayDiv.empty();
    forecastDiv.empty();
    var city = $(this).attr("data-name");
    processForm(city);
});

// clear history and forecast divs
$('#clear').on('click', function () {
    todayDiv.empty();
    forecastDiv.empty();
    $('#history').empty();
    localStorage.clear();
    location.reload(true);

});

// to retreive buttons on the page
renderButtons();


