var cityHistory = [];
var todayDiv = $('#today');
var forecastDiv = $('#forecast');
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
var today;
var forecastDay;

// function to create cards for the specific day weather
function createCard(date, dateFormat, wDiv, cityName) {
    weatherDiv = $('<div>');
    wDiv.append(weatherDiv);
    weatherInfo = $('<h5>');
    if (date === 'today') {
        weatherDiv.attr('class', 'card');
        today = dateFormat;
        weatherInfo.text(`${cityName.charAt(0).toUpperCase() + cityName.slice(1)} ${today}`);
    };
    if (date === 'forecast') {
        weatherDiv.attr('class', 'card col');
        forecastDay = dateFormat;
        weatherInfo.text(forecastDay.toLocaleDateString());
    };
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

    tempLi.text(`Temperature: ${temp}ºC`);
    windLi.text(`Wind Speed: ${wind} mps`);
    humidityLi.text(`Humidity: ${humidity}%`);
};

function processForm(city) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba14af29e70b969c97f97a7190344c26`
    console.log(queryUrl);
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecast = dayjs().add(1, 'day');
            temp = data.list[0].main.temp;
            wind = data.list[0].wind.speed;
            humidity = data.list[0].main.humidity;
            createCard('today', dayjs().format('DD-MM-YYYY'), todayDiv, city);

            for (var i = 8; i < data.list.length; i += 8) {
                temp = data.list[i].main.temp;
                wind = data.list[i].wind.speed;
                humidity = data.list[i].main.humidity;

                createCard('forecast', new Date(data.list[i].dt_txt), forecastDiv);
            };
            return true;
        })
        .catch(error => {
            console.log('Error:', error);
        });
    $('#search-input').val('');
};
$('#search-form').on('submit', function (event) {
    event.preventDefault();
    todayDiv.empty();
    forecastDiv.empty();
    city = $('#search-input').val();
    // capitalise first letter if lower case and handle uppercase
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    // handle empty form and city searched before
    if (city && !cityHistory.includes(city)) {
        processForm(city);
        var cityBtn = $('<button>');
        cityBtn.addClass('city');
        cityBtn.attr('data-name', city);
        $('#history').prepend(cityBtn);
        cityBtn.text(city);
    }
    else {
        alert('This field can not be empty!');
    }
    // add city to history
    if (!cityHistory.includes(city)) {
        cityHistory.push(city);
        console.log(cityHistory);
    };

});


// click events to add functionality to history buttons
$(document).on('click', '.city', function () {
    todayDiv.empty();
    forecastDiv.empty();
    var city = $(this).attr("data-name");
    console.log(city);
    processForm(city);
});

