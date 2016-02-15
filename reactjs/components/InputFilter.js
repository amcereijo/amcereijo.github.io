
import React, { Component, PropTypes } from 'react';

export default class InputFilter extends Component {

	render() {
		return (
			<p className="text-left"><input onKeyUp={this.props.filterFunction.bind(this)}
				type="text" className="form-control searchRepos" placeholder="Search" /></p>
		);
	}
}

InputFilter.propTypes = {
  filterFunction: PropTypes.func.isRequired,
};



