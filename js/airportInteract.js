'use strict';

var count = 0; // count to create unique IDs and to properly format boxes
(function() {
  const AIRPORT_LIST = ['SFO', 'LAX', 'JFK', 'ATL', 'MIA', 'AUS', 'BOS', 'ORD', 'PDX']; // used for URL in ajax
  AIRPORT_LIST.forEach(airportName => {
    let urlCurr = `http://services.faa.gov/airport/status/${airportName}?format=application/json`;
    initializeAirports(urlCurr, createAirports);
  })
})();

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

// this function creates and uses airport classes to create boxes with live airport information
function createAirports(data) {
  let airportCurr = document.createElement('div')

  class Airport {
    constructor(abbrev, fullName, city, status, temp, updated) {
      this.abbrev = abbrev,
      this.fullName = fullName,
      this.city = city,
      this.status = status,
      this.temp = temp,
      this.updated = updated
    }

    createContainer(airportCurr) {
      $(airportCurr)
        .attr('id', airportInst.abbrev + count + '')
        .attr('class', 'airportContainers');
    }

    alignment() {
      if (count % 3 === 0) {
        $(airportCurr).css('clear', 'both');
      }
      $(airportCurr).css('float', 'left');
      $('#area').append(airportCurr);
    }

    boxOutlineStyler() {
      Object.getOwnPropertyNames(airportInst).forEach(val => {
        let airPortProp = (val === 'abbrev') ? document.createElement('h3') : document.createElement('div');

        // airport box outline becomes thicker and red if there is a delay
        if (airportInst.status !== 'No known delays for this airport') {
          $('#' + airportInst.abbrev + count)
            .css('outline-color', '#ef3d47')
            .css('outline-width', '9px');
        }

        $(airPortProp)
          .attr('id', val)
          .html(airportInst[val]);
        $('#' + airportInst.abbrev + count).append(airPortProp);
      });
    }

    static incrementCount() {
      count++;
    }
  }

  let airportInst = new Airport(data.IATA, data.name, data.city, data.status.reason.replace('.', ''),
                data.weather.temp, 'Last Updated: ' + data.weather.meta.updated);

  airportInst.createContainer(airportCurr);
  airportInst.alignment();
  airportInst.boxOutlineStyler();
  Airport.incrementCount();
}
