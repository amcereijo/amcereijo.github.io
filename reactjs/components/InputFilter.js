import React, { Component, PropTypes } from 'react';
import { filterFunction } from '../actions/projectsActions';
import { connect } from 'react-redux';

class InputFilter extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	filterFunctionEvent(evt) {
		const { dispatch } = this.props;
		const hasEvent = () => evt && evt.target && evt.keyCode;
		const isValidKey = () => (/[a-zA-Z0-9-_ ]/.test(String.fromCharCode(evt.keyCode))) ||
			[8,46,32].indexOf(evt.keyCode) >= 0;

		if(hasEvent() && isValidKey()) {
			const filterValue = evt.target.value;
			console.log(`Event: "${filterValue}"`);

			dispatch(filterFunction('inputFilter', (actualProject) => {
				console.log('actualProject: ', actualProject);
				return (actualProject.name && actualProject.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
			}, true));
		}
	}

	render() {
		return (
			<p className="text-left"><input onKeyUp={this.filterFunctionEvent.bind(this)}
				type="text" className="form-control searchRepos" placeholder="Search" /></p>
		);
	}
}

InputFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default connect()(InputFilter);
