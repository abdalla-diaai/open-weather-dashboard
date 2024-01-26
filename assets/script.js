var city;
var current;
var currentDate;
var today;
$('#search-form').on('submit', function (event) {
    event.preventDefault();
    today = dayjs().format('YYYY-MM-DD');
    console.log(today);
    city = $('#search-input').val();
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba14af29e70b969c97f97a7190344c26`

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // YOUR CODE GOES HERE!!!
            console.log(data.list[0])
            current = JSON.stringify(data.list[0].dt_txt);

            currentDate = current.substring(1, current.indexOf(' '));
            console.log(currentDate);

            if (currentDate == today) {
                console.log('true');
            }
            $('#forecast').text(JSON.stringify(data.list[0].dt_txt));
        });
        $('#search-input').val('');
})  
