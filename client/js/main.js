import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { airportList, apiURL } from './constants';
import '../sass/main.scss';

let AirportContainer = React.createClass({
  getInitialState: function() {
    return {
      airportData: [],
      toProcess: [],
      count: 0,
      filter: '' // current value of the form
    };
  },

 /**
 * Creates multiple ajax requests to the FAA API for each specified data
 *
 * @param {Function} fillAirportData
 */
  loadAirportData: function(fillAirportData) {
    this.props.airportList.forEach(airportName => {
      $.ajax({
        type: 'GET',
        url: this.props.apiURL.replace('AIRPORTNAME', airportName),
        data: {},
        dataType: 'jsonp',
        success: fillAirportData
      });
    });
  },

  /**
  * Extracts the appropriate information from the ajax requests and stores them
  *
  * @param {Object} data
  */
  fillAirportData: function(data) {
    let airportCurr = {
      abbrev: data.IATA,
      fullName: data.name,
      city: data.city,
      status: data.status.reason.replace('.', ''),
      temp: data.weather.temp,
      updated: `Last Updated: ${data.weather.meta.updated}`
    };
    this.setState({
      airportData: this.state.airportData.concat([airportCurr]),
      count: this.state.count + 1
    });
  },

  componentWillMount: function() {
    this.loadAirportData(this.fillAirportData);
  },

  /**
  * Updates the state of the filter when the text in the form changes
  *
  * @param {Event} event
  */
  handleFilterChange: function(event) {
    let updatedToProcess = [];
    for (let i = 0; i < this.state.airportData.length; i++) {
      // seeing if the user input is a substring of the string of any (full) airport name
      let airportFullName = this.state.airportData[i].fullName.toUpperCase();
      let filterText = this.state.filter.toUpperCase();
      if (airportFullName.indexOf(filterText) > -1) {
        updatedToProcess.push(this.state.airportData[i]);
      }
    }
    this.setState({
      filter : event.target.value,
      toProcess : updatedToProcess
    });
  },

  render: function() {
    // to have a new line after every 3 airports
    let toClear = (this.state.count % 3 === 1) ? {clear: 'both',  float: 'left'} : {float: 'left'};
    let displayList = (this.state.filter === '') ? this.state.airportData : this.state.toProcess;
    return (
      <div>
        <form>
          <input
            type="text"
            name="filter"
            value={ this.state.filter }
            onChange={ this.handleFilterChange }
            placeholder="Enter an airport name"
          />
          <br />
          <br />
          <br />
        </form>
        { displayList.map(airportNode => (
            <div
              className ={ 'airportContainers' }
              key={ airportNode.abbrev }
              style={toClear}
              >
              <h3 id="abbrev"> { airportNode.abbrev } </h3>
              <div id="fullName"> { airportNode.fullName } </div>
              <div id="city"> { airportNode.city } </div>
              <div id="status"> { airportNode.status } </div>
              <div id="temp"> { airportNode.temp } </div>
              <div id="updated"> { airportNode.updated } </div>
            </div>
        ))}
      </div>
    );
  }
});

ReactDOM.render(
  <AirportContainer
    airportList = { airportList }
    apiURL = { apiURL }
   />,
  document.getElementById('content')
);
