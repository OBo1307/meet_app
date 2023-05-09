import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
	let EventWrapper;
	const event = mockData[0];

	beforeAll(() => {
		EventWrapper = shallow(<Event event={event} />);
	});

	test('should render the event summary, location, and start time', () => {
		expect(EventWrapper.find('.event-title')).toHaveLength(1);
		expect(EventWrapper.find('.event-title').text()).toBe(event.summary);
		expect(EventWrapper.find('.event-location')).toHaveLength(1);
		expect(EventWrapper.find('.event-location').text()).toBe(event.location);
		expect(EventWrapper.find('.event-start-time')).toHaveLength(1);
		expect(EventWrapper.find('.event-start-time').text()).toBe(
			event.start.dateTime
		);
	});

	test('should hide event description by default', () => {
		expect(EventWrapper.find('.event-details')).toHaveLength(0);
	});

	test('should show event description when "Show Details" button is clicked', () => {
		EventWrapper.find('.details-btn').simulate('click');
		expect(EventWrapper.find('.event-details')).toHaveLength(1);
		expect(EventWrapper.find('.event-description')).toHaveLength(1);
		expect(EventWrapper.find('.event-description').text()).toBe(
			event.description
		);
	});

	test('should hide event description when "Hide Details" button is clicked', () => {
		EventWrapper.find('.details-btn').simulate('click');
		expect(EventWrapper.find('.event-details')).toHaveLength(0);
	});
});
