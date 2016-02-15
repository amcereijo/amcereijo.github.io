import React, { Component, PropTypes } from 'react';

export default class Nav extends Component {
	render() {
		return (
		<nav className="container">
			<p className="text-left">
				<span id="laguages">
					<span className="languageBtn btn btn-default disabled">All</span>

					{this.props.languages.map((language, i) =>
	          <span key={language.name} className="languageBtn btn btn-default" 
	          	style={{backgroundColor: language.color }}
	          	data-language={language.name}>{language.name}</span>
	        )}
				</span>
			</p>
			<p className="text-left"><input type="text" className="form-control searchRepos" placeholder="Search" /></p>
		</nav>
		);
	}
}

Nav.propTypes = {
  languages: PropTypes.array.isRequired,
};
