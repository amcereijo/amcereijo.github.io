import React, { Component, PropTypes } from 'react';
import InputFilter from './inputFilter';

export default class Nav extends Component {

	render() {
		const disbleButtonClass = 'languageBtn btn btn-default disabled';
		const buttonClass = 'languageBtn btn btn-default';
		const languages = this.props.languages || [];

		const onClickFunction = this.props.filterLanguageFunction;

		console.log(' => NAV -> selectedLanguage: ', this.props.selectedLanguage);
		return (
		<nav className="container">
			<p className="text-left">
				<span id="laguages">
					<span onClick={onClickFunction.bind(null, '')}
						className={this.props.selectedLanguage === 'All' ? disbleButtonClass:buttonClass}>All</span>

					{languages.map((language, i) =>
	          <span onClick={onClickFunction.bind(null, language.name)}
	          	key={language.name}
	          	className={this.props.selectedLanguage === language.name ? disbleButtonClass:buttonClass}
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
  filterLanguageFunction: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};
