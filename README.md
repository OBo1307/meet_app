## Meet App (Project for CareerFoundry)

![Untitled](https://github.com/OBo1307/meet_app/assets/67460576/c63366a6-77d9-447f-a0f7-a3ed7e0875c6)


The app is hosted on GitHub Pages and can be found https://obo1307.github.io/meet_app/

## Objective

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

For this app, you’ll be using a TDD approach, where you write tests before writing the actual functionality for your app in code. Writing tests forces you to focus on the requirements of your
application before jumping into the code. TDD relies on the repetition of a very short development cycle, allowing you to get immediate feedback and deliver high-quality code.

The main goal of this project is to develop a PWA that combines the benefits of serverless architecture and PWAs, with the following features:

-	Serverless: No backend maintenance, easy to scale, always available, no cost for idle time.
-	PWAs: Instant loading, offline support, push notifications, "add to home screen" prompt, responsive design, and cross-platform compatibility.

#Key Features:
1.Feature: 
Filter events by city.
User Story: 
Example: As a [role], I should be able to [action] So that [benefit] 
As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.
Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
“Given-When-Then” syntax: 
Given user hasn’t searched for any city 
When the user opens the app 
Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.
“Given-When-Then” syntax: 
Given the main page is open 
When user starts typing in the city textbox 
Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list.
“Given-When-Then” syntax: 
Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing 
When the user selects a city (e.g., “Berlin, Germany”) from the list 
Then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

2.Feature: 
Show/hide event details.
User Story: As a user, I should be able to show/hide event details so that I can see more/less information about an event.

Scenario 1: An event element is collapsed by default.
“Given-When-Then” syntax: 
Given the list of events is open 
When the user scrolls through the list of events 
Then all event details should be hidden

Scenario 2: User can expand an event to see its details.
“Given-When-Then” syntax: 
Given the list of events is open 
When the user clicks on an event 
Then the event details of said event should be shown

Scenario 3: User can collapse an event to hide its details.
“Given-When-Then” syntax: 
Given the user has previously expanded an event to see its details 
When the user clicks on the hide button
Then the event details of said event should be hidden

3.Feature: 
Specify number of events. 
User Story: 
As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
Scenario 1: 
When user hasn’t specified a number, 32 is the default number
“Given-When-Then” syntax: 
Given the user has not specified a number of events to be displayed 
When the user opens the app 
Then the user should see a maximum of 32 events by default

Scenario 2: User can change the number of events they want to see
“Given-When-Then” syntax: 
Given A list of events is open 
When the user changes the number of events to be displayed 
Then the list should update to the specified number of events

4.Feature: 
Use the app when offline. 
User Story: 
As a user,I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
Scenario 1: Show cached data when there’s no internet connection
“Given-When-Then” syntax: 
Given The user's device has no internet connection 
When the user opens the app 
Then previously cached data should be displayed

Scenario 2: Show error when user changes the settings (city, time range)
“Given-When-Then” syntax: 
Given The user's device has no internet connection 
When the user changes settings such as city or time range
Then an error message should be displayed, informing the user that internet access is required

5.Feature: 
Add an app shortcut to the home screen. 
User Story: 
As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

6.Feature: 
View a chart showing the number of upcoming events by city. 
User Story: 
As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

Scenario 1: 
Show a chart with the number of upcoming events in each city
“Given-When-Then” syntax: 
Given the user hasn't searched a specific city 
When the user opens the app 
Then a chart with an overview, indicating the number of upcoming events by city will be shown.


