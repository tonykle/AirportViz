'use strict';

$(document).ready(function() {
  const AIRPORT_LIST = ['SFO', 'LAX', 'PHX', 'JFK', 'ATL', 'MIA', 'AUS', 'BOS', 'CLE', 'ORD', 'PDX']; // used for URL in ajax
  for (let airportName of AIRPORT_LIST) {
    let urlCurr = 'http://services.faa.gov/airport/status/' + airportName + '?format=application/json';
    initializeAirports(urlCurr, createAirports);
  }
});

// ajax calls to receive JSON data
function initializeAirports(airportName, createAirports) {
  $.ajax({
    type: 'GET',
    url: airportName,
    data: {},
		dataType: 'jsonp',
    success: createAirports
  })
}

// this function creates airport objects and adds them to an array
function createAirports(data) {
  let airport = {
    abbrev : data.IATA,
    fullName : data. name,
    city : data.city,
    delay : data.delay,
    status: data.status.reason,
    temp : data.weather.temp,
    weather: data.weather.weather,
    wind: data.weather.wind
  }
  displayAirportInfo(airport);
}

function displayAirportInfo(airport) {
  console.log(airport);
}
