import React, { Component } from 'react';

class Event extends Component {
	state = {
		showDetails: false,
	};

	toggleDetails = () => {
		this.setState((prevState) => ({
			showDetails: !prevState.showDetails,
		}));
	};

	render() {
		const { event } = this.props;
		const { showDetails } = this.state;

		return (
			<div className='event'>
				<div className='event-summary'>
					<h2 className='event-title'>{event.summary}</h2>
					<p className='event-location'>{event.location}</p>
					<p className='event-start-time'>{event.start.dateTime}</p>
					{showDetails && (
						<div className='event-details'>
							<p className='event-description'>{event.description}</p>
						</div>
					)}
				</div>
				<button className='details-btn' onClick={this.toggleDetails}>
					{showDetails ? 'Hide Details' : 'Show Details'}
				</button>
			</div>
		);
	}
}

export default Event;
