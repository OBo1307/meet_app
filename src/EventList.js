import React, { Component } from 'react';
import Event from './Event';
import './App.css';

class EventList extends Component {
	render() {
		const { events, numEvents } = this.props;
		return (
			<ul className='EventList'>
				{events.slice(0, numEvents).map((event) => (
					<li key={event.id}>
						<Event event={event} />
					</li>
				))}
			</ul>
		);
	}
}

export default EventList;
