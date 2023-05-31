import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

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

	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter(
				(event) => event.location === location
			).length;
			const city = location.split(', ').shift();
			return { city, number };
		});
		return data;
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
		const { events } = this.state;

		if (this.state.showWelcomeScreen === undefined)
			return <div className='App' />;
		return (
			<div className='App'>
				<h1>Meet App</h1>
				<h4>Choose your nearest city</h4>
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<h4>Number of Events:</h4>
				<NumberOfEvents
					numEvents={this.state.numEvents}
					updateNumEvents={this.updateNumEvents}
					updateEvents={this.updateEvents}
				/>
				<h4>Events in each city</h4>
				<div className='data-vis-wrapper'>
					<EventGenre events={events} />
					<ResponsiveContainer height={400}>
						<ScatterChart
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<CartesianGrid />
							<XAxis type='category' dataKey='city' name='City' />
							<YAxis
								type='number'
								dataKey='number'
								name='Number of events'
								allowDecimals={false}
							/>
							<Tooltip cursor={{ strokeDasharray: '3 3' }} />
							<Scatter data={this.getData()} fill='#8884d8' />
						</ScatterChart>
					</ResponsiveContainer>
				</div>
				<WarningAlert text={this.state.warningText} />
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
