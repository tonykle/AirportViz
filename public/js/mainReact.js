var AirportContainer = React.createClass({
  getInitialState: function() {
    return {
      airportData: [],
      count: 0
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
    })
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
      updated: 'Last Updated: ' + data.weather.meta.updated
    };
    this.setState({
      airportData: this.state.airportData.concat([airportCurr]),
      count: this.state.count + 1
    });
  },

  componentWillMount: function() {
    this.loadAirportData(this.fillAirportData);
  },

  render: function() {
    // to have a new line after every 3 airports
    let toClear = (this.state.count % 3 === 1) ? {clear: 'both',  float: 'left'} : {float: 'left'};
    return(
      <div>
        {this.state.airportData.map(airportNode => (
            <div
              className ={'airportContainers'}
              key={airportNode.abbrev}
              style={toClear}
              >
              <h3 id="abbrev">{airportNode.abbrev}</h3>
              <div id="fullName">{airportNode.fullName}</div>
              <div id="city">{airportNode.city}</div>
              <div id="status">{airportNode.status}</div>
              <div id="temp">{airportNode.temp}</div>
              <div id="updated">{airportNode.updated}</div>
            </div>
        ))}
      </div>
    );
  }
});

ReactDOM.render(
  <AirportContainer
    airportList = {['SFO', 'LAX', 'JFK', 'ATL', 'MIA', 'AUS', 'BOS', 'ORD', 'PDX']}
    apiURL = 'http://services.faa.gov/airport/status/AIRPORTNAME?format=application/json'
   />,
  document.getElementById('content')
);
