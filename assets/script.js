var city;
var temp;
var wind;
var humidity;
var tempDiv;
var windDiv;
var humidity;
var today;
$('#search-form').on('submit', function (event) {
    event.preventDefault();
    today = dayjs().format('DD-MM-YYYY');
    console.log(today);
    city = $('#search-input').val();
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba14af29e70b969c97f97a7190344c26`

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // YOUR CODE GOES HERE!!!
            console.log(data.list)
            for (var i = 0; i < data.list.length; i+=8) {
                // temp = JSON.stringify(data.list[0].main.temp);
                // wind = JSON.stringify(data.list[0].wind.speed);
                // humidity = JSON.stringify(data.list[0].main.humidity);
                // $('.card-title').text(`${city} ${today}`);
                // $('#temp').text(`Temperature: ${temp}ºC`);
                // $('#wind').text(`Wind Speed: ${temp} mps`);
                // $('#humidity').text(`Humidity: ${temp}%`);
                console.log(data.list[i]);
            }
        
        });
        $('#search-input').val('');
})  
