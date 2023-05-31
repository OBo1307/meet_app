import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numEvents: 32,
		warningText: '',
		showWelcomeScreen: undefined,
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

	async componentDidMount() {
		this.mounted = true;
		const accessToken = localStorage.getItem('access_token');
		const isTokenValid = (await checkToken(accessToken)).error ? false : true;
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		this.setState({ showWelcomeScreen: !(code || isTokenValid) });
		if ((code || isTokenValid) && this.mounted) {
			getEvents().then((events) => {
				if (this.mounted) {
					this.setState({ events, locations: extractLocations(events) });
				}
			});
		}
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
		if (this.state.showWelcomeScreen === undefined)
			return <div className='App' />;

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
				<WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/>
			</div>
		);
	}
}

export default App;
