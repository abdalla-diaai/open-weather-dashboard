var cityHistory = [];
var city;
var temp;
var wind;
var humidity;
var weatherUl;
var tempLi;
var windLi;
var humidityLi;
var today;



$('#search-form').on('submit', function (event) {
    event.preventDefault();
    today = dayjs().format('DD-MM-YYYY');
    city = $('#search-input').val();
    $('#history').prepend($('<button>').text(city));
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba14af29e70b969c97f97a7190344c26`

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // YOUR CODE GOES HERE!!!
            temp = JSON.stringify(data.list[0].main.temp);
            wind = JSON.stringify(data.list[0].wind.speed);
            humidity = JSON.stringify(data.list[0].main.humidity);
            weatherUl = $('<ul>');
            tempLi = $('<li>');
            windLi = $('<li>');
            humidityLi = $('<li>');
            weatherUl.append(tempLi);
            weatherUl.append(windLi);
            weatherUl.append(humidityLi);

            tempLi.text(`Temperature: ${temp}ºC`);
            windLi.text(`Wind Speed: ${wind} mps`);
            humidityLi.text(`Humidity: ${humidity}%`);
            $('#today').append(weatherUl);
            console.log(data.list)
            for (var i = 8; i < data.list.length; i += 8) {
                $('<div>')
                temp = JSON.stringify(data.list[i].main.temp);
                wind = JSON.stringify(data.list[i].wind.speed);
                humidity = JSON.stringify(data.list[i].main.humidity);
                weatherUl = $('<ul>');
                tempLi = $('<li>');
                windLi = $('<li>');
                humidityLi = $('<li>');
                weatherUl.append(tempLi);
                weatherUl.append(windLi);
                weatherUl.append(humidityLi);

                tempLi.text(`Temperature: ${temp}ºC`);
                windLi.text(`Wind Speed: ${wind} mps`);
                humidityLi.text(`Humidity: ${humidity}%`);
                $('#forecast').append(weatherUl);
            }

        });
    $('#search-input').val('');
})  
