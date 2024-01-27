# open-weather-dashboard

A simple weather dashboard to fetch 5 day weather forecast from open weather API.

## Description

The dashboard is supported by a search form where the user enter the name of the city of interest and clicking search button to fetch the 5 day forecast. The weather coniditon for the current day is shown at the top followed by four cards for the remaining four days. Each card shows the date, temp in degrees celsius, wind speed in mps, and humidity as a percentage. The page then store the cities as buttons on the left side of the page which can be clicked to fetch the forecast for this specific city. 

## Installation 

NA

## Usage

Simply enter the name of the city of interest in the search bar and click the search button to fetch the 5 day forecast for this city. The search history will be stored in local storage. The local storage can be cleared by clicking clear history button. Error messages and warning appears when searching for a city that already exists in the history, or searching for an empty field or searching for non-existent city names. [Screenshot](./assets/Screenshot%20of%20deployed%20page.png) of deployed page. [LINK TO DEPLOYED PAGE](https://abdalla-diaai.github.io/open-weather-dashboard/).

## Credit

The current page is supported by Open Weather API. More information about the usage and license can be found [HERE](https://openweathermap.org/api/one-call-3).

## License

Please refer to the LICENSE in the repository.