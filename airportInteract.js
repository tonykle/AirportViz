'use strict';

$(document).ready(function() {
  const AIRPORT_LIST = ['SFO', 'LAX', 'PHX', 'JFK', 'ATL', 'MIA', 'AUS', 'BOS', 'CLE', 'ORD', 'PDX']; // used for URL in ajax
  AIRPORT_LIST.forEach(airportName => {
    let urlCurr = 'http://services.faa.gov/airport/status/' + airportName + '?format=application/json';
    initializeAirports(urlCurr, createAirports);
  })
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
  console.log(data); // remove
  let airport = {
    abbrev : data.IATA,
    fullName : data.name,
    city : data.city,
    status: data.status.reason,
    temp : data.weather.temp,
    wind: data.weather.wind
  }
  let airportCurr = document.createElement("div");
  $(airportCurr)
    .attr("id", airport.abbrev + "1")
    .attr("class", "airportContainers");
  $("#area").append(airportCurr);

  Object.getOwnPropertyNames(airport).forEach(val => {
    let airPortProp;
    if (val == "abbrev") {
      airPortProp = document.createElement("h3");
    } else {
      airPortProp = document.createElement("div");
    }
    $(airPortProp)
      .attr("id", val)
      .html(airport[val]);
    $("#" + airport.abbrev + "1").append(airPortProp);

  });
}
