var cityHistory = [];
var todayDiv = $('#today');
var forecastDiv = $('#forecast');
var city;
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
function createCard(date, dateFormat, wDiv) {
    weatherDiv = $('<div>');
    wDiv.append(weatherDiv);
    weatherInfo = $('<h5>');
    if (date === 'today') {
        weatherDiv.attr('class', 'card');
        today = dateFormat;
        weatherInfo.text(`${city} ${today}`);
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

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // YOUR CODE GOES HERE!!!
            forecast = dayjs().add(1, 'day');
            temp = JSON.stringify(data.list[0].main.temp);
            wind = JSON.stringify(data.list[0].wind.speed);
            humidity = JSON.stringify(data.list[0].main.humidity);
            createCard('today', dayjs().format('DD-MM-YYYY'), todayDiv);

            for (var i = 8; i < data.list.length; i += 8) {
                temp = JSON.stringify(data.list[i].main.temp);
                wind = JSON.stringify(data.list[i].wind.speed);
                humidity = JSON.stringify(data.list[i].main.humidity);
                
                createCard('forecast', new Date(data.list[i].dt_txt), forecastDiv);
            }
        
        })
        .catch(error => {
            console.log('Error:', error);
        });
    $('#search-input').val('');
};
$('#search-form').on('submit', function (event) {
    
    todayDiv.empty();
    forecastDiv.empty();
    event.preventDefault();
    city = $('#search-input').val();
    cityHistory.push(city);
    if (city) {
        if (processForm(city)) {
            $('#history').prepend($('<button>').text(city));
        }
    }
    else {
        alert('This field can not be empty!')
    }
});
