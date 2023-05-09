import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
		numEvents: 32,
	};

	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			numEvents: value,
		});
		this.props.updateNumEvents(value);
	};

	render() {
		const { numEvents } = this.state;

		return (
			<div className='NumberOfEvents'>
				<label htmlFor='num-events' className='number-label'>
					Number of Events:
				</label>
				<input
					type='number'
					id='num-events'
					className='number'
					name='num-events'
					value={numEvents}
					onChange={this.handleInputChange}
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
