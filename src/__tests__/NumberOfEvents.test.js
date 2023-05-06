import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
	let NumberOfEventsWrapper;
	beforeAll(() => {
		NumberOfEventsWrapper = shallow(
			<NumberOfEvents updateNumEvents={() => {}} />
		);
	});

	test('should render a textbox for the number of events', () => {
		expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
	});

	test('should render a label for the number of events textbox', () => {
		expect(NumberOfEventsWrapper.find('.number-label')).toHaveLength(1);
	});

	test('should update the number of events when textbox value changes', () => {
		const eventObject = { target: { value: 10 } };
		NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
		expect(NumberOfEventsWrapper.state('numEvents')).toBe(10);
	});
});
