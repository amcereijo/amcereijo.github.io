import React, { Component, PropTypes } from 'react';

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
			<p className="text-left"><input type="text" className="form-control searchRepos" placeholder="Search" /></p>
		</nav>
		);
	}
}

Nav.propTypes = {
  languages: PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired,
};
