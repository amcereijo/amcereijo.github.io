import React, { Component, PropTypes } from 'react';
import InputFilter from './inputFilter';

export default class Nav extends Component {
	onClick(value) {
		console.log('Selected: ', value);
	}

	render() {
		return (
		<nav className="container">
			<p className="text-left">
				<span id="laguages">
					<span onClick={this.onClick.bind(this, '')} className="languageBtn btn btn-default disabled">All</span>

					{this.props.languages.map((language, i) =>
	          <span onClick={this.onClick.bind(this, language.name)}
	          	key={language.name}
	          	className="languageBtn btn btn-default"
	          	style={{backgroundColor: language.color }}
	          	data-language={language.name}>
	          		{language.name}
	          </span>
	        )}
				</span>
			</p>
			<InputFilter filterFunction={this.props.filterFunction} />
		</nav>
		);
	}
}

Nav.propTypes = {
  languages: PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired,
  filterFunction: PropTypes.func.isRequired,
};
