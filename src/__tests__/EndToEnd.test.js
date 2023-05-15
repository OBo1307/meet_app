import puppeteer from 'puppeteer';
import { mockData } from '../mock-data';
import '@testing-library/jest-dom/extend-expect';

describe('show/hide an event details', () => {
	let browser;
	let page;
	beforeAll(async () => {
		jest.setTimeout(30000);
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('An event element is collapsed by default', async () => {
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeNull();
	});

	test('User can expand an event to see its details', async () => {
		await page.click('.event .details-btn');
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeDefined();
	});

	test('User can collapse an event to hide its details', async () => {
		await page.click('.event .details-btn');
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeNull();
	});
});

describe('Filter events by city', () => {
	let browser;
	let page;

	beforeAll(async () => {
		jest.setTimeout(30000);
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
		const eventList = await page.$('.EventList');
		const events = await eventList.$$('.event');
		expect(events).toHaveLength(mockData.length);
	});

	test('User should see a list of suggestions when they search for a city', async () => {
		await page.type('.city', 'Berlin');
		const suggestions = await page.$$('.suggestions li');
		expect(suggestions).toHaveLength(2);
	});

	test('User can select a city from the suggested list', async () => {
		await page.click('.suggestions li:first-child');
		const eventList = await page.$('.EventList');
		const events = await eventList.$$('.event');
		expect(events).toHaveLength(1);
	});
});
