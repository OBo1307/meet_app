import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<CitySearch />
				<NumberOfEvents updateNumEvents={this.updateNumEvents} />
				<EventList />
			</div>
		);
	}
}

export default App;
