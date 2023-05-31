import React, { Component } from 'react';
import { ErrorAlert } from './Alert';
import './App.css';

class NumberOfEvents extends Component {
	state = {
		numEvents: 32,
		errorText: '',
	};

	handleInputChange = (event) => {
		const value = event.target.value;
		if (value < 1) {
			this.setState({
				numEvents: value,
				errorText: 'Please enter a number greater than 0',
			});
		} else {
			this.props.updateNumEvents(value);
			this.setState({
				numEvents: value,
				errorText: '',
			});
		}
	};

	render() {
		const { numEvents } = this.state;

		return (
			<div className='NumberOfEvents'>
				<ErrorAlert text={this.state.errorText} />
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
