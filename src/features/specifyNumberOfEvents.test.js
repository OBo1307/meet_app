import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
	test('When user has not specified a number let 32 be the default number', ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given('that a user has not specified a number of events', () => {});

		when('selecting cities', async () => {
			AppWrapper = await mount(<App />);
			AppWrapper.find('.city').simulate('change', {
				target: { value: 'Berlin' },
			});
		});

		then('A default number of 32 is loaded on the page', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
		});
	});

	test('User can change the number of events they want to see', ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given('that the user does not want to view all events', async () => {
			AppWrapper = await mount(<App />);
			expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
			expect(AppWrapper.state('numEvents')).toEqual(32);
		});

		when('user changes the number of events in the input box', () => {
			const inputNumber = AppWrapper.find('.number');
			inputNumber.simulate('change', { target: { value: 1 } });
		});

		then(
			'the User should be able to change the number of events they want to see.',
			() => {
				expect(AppWrapper.state('numEvents')).toEqual(1);
			}
		);
	});
});
