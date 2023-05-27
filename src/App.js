import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numEvents: 32,
		warningText: '',
	};

	updateNumEvents = (value) => {
		this.setState({
			numEvents: value,
		});
	};

	updateEvents = (location, eventCount) => {
		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			this.setState({
				events: locationEvents.slice(0, eventCount || this.state.numEvents),
			});
		});
	};

	componentDidMount() {
		this.mounted = true;
		this.promptOfflineWarning();
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({
					events: events.slice(0, this.state.numEvents),
					locations: extractLocations(events),
				});
			}
		});
	}

	promptOfflineWarning = () => {
		if (!navigator.onLine) {
			this.setState({
				warningText:
					'You are currently offline. Events displayed may not be up-to-date.',
			});
		} else {
			this.setState({
				warningText: '',
			});
		}
	};

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<div className='App'>
				<WarningAlert text={this.state.warningText} />
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numEvents={this.state.numEvents}
					updateNumEvents={this.updateNumEvents}
					updateEvents={this.updateEvents}
				/>
				<EventList
					events={this.state.events}
					numEvents={this.state.numEvents}
				/>
			</div>
		);
	}
}

export default App;
