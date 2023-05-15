import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
	let AppWrapper;
	beforeAll(() => {
		AppWrapper = shallow(<App />);
	});

	test('render list of events', () => {
		expect(AppWrapper.find(EventList)).toHaveLength(1);
	});

	test('render CitySearch', () => {
		expect(AppWrapper.find(CitySearch)).toHaveLength(1);
	});

	test('should render number of events', () => {
		expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
	});

	test('passes number of events to EventList component', () => {
		const numberOfEvents = 2;
		AppWrapper.setState({ numEvents: numberOfEvents });
		expect(AppWrapper.find(EventList).props().events).toHaveLength(
			numberOfEvents
		);
	});

	test('updates state property "numEvents" with new value when "updateNumEvents" is called', () => {
		const newNumEvents = 10;
		AppWrapper.instance().updateNumEvents(newNumEvents);
		expect(AppWrapper.state('numEvents')).toEqual(newNumEvents);
	});
});

describe('<App /> integration', () => {
	test('App passes "events" state as a prop to EventList', () => {
		const AppWrapper = mount(<App />);
		const AppEventsState = AppWrapper.state('events');
		expect(AppEventsState).not.toEqual(undefined);
		expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
		AppWrapper.unmount();
	});

	test('App passes "locations" state as a prop to CitySearch', () => {
		const AppWrapper = mount(<App />);
		const AppLocationsState = AppWrapper.state('locations');
		expect(AppLocationsState).not.toEqual(undefined);
		expect(AppWrapper.find(CitySearch).props().locations).toEqual(
			AppLocationsState
		);
		AppWrapper.unmount();
	});

	test('get list of events matching the city selected by the user', async () => {
		const AppWrapper = mount(<App />);
		const CitySearchWrapper = AppWrapper.find(CitySearch);
		const locations = extractLocations(mockData);
		CitySearchWrapper.setState({ suggestions: locations });
		const suggestions = CitySearchWrapper.state('suggestions');
		const selectedIndex = Math.floor(Math.random() * suggestions.length);
		const selectedCity = suggestions[selectedIndex];
		await CitySearchWrapper.instance().handleItemClicked(selectedCity);
		const allEvents = await getEvents();
		const eventsToShow = allEvents.filter(
			(event) => event.location === selectedCity
		);
		expect(AppWrapper.state('events')).toEqual(eventsToShow);
		AppWrapper.unmount();
	});

	test('get list of all events when user selects "See all cities"', async () => {
		const AppWrapper = mount(<App />);
		const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
		await suggestionItems.at(suggestionItems.length - 1).simulate('click');
		const allEvents = await getEvents();
		expect(AppWrapper.state('events')).toEqual(allEvents);
		AppWrapper.unmount();
	});

	test('App passes "numEvents" state as a prop to NumberOfEvents', () => {
		const AppWrapper = mount(<App />);
		const AppNumEventsState = AppWrapper.state('numEvents');
		expect(AppNumEventsState).not.toEqual(undefined);
		expect(AppWrapper.find(NumberOfEvents).props().numEvents).toEqual(
			AppNumEventsState
		);
		AppWrapper.unmount();
	});

	test('change state when user inputs a number', () => {
		const AppWrapper = mount(<App />);
		const eventObject = { target: { value: 10 } };
		AppWrapper.find('.number').simulate('change', eventObject);
		expect(AppWrapper.state('numEvents')).toBe(10);
		AppWrapper.unmount();
	});
});
