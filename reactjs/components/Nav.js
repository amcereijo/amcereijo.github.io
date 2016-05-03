import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputFilter from './inputFilter';
import { filterFunction } from '../actions/projectsActions';

class Nav extends Component {

	constructor(props) {
		super(props);
		this.state = { selectedLanguage: 'All' };
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	onClickElement(evt) {
		const language = evt.target.getAttribute('data-language');
		const { dispatch } = this.props;

		this.setState({ selectedLanguage: language || 'All' });

		console.log('selected language to filter: ', language);

		dispatch(filterFunction('languageFilter', (actualProject) => {
			const actualProjectLanguaje = (actualProject && actualProject.language && actualProject.language.toLowerCase()) || 'Other' ;
			return language === '' || actualProjectLanguaje.toLowerCase() === language.toLowerCase();
		}, true));

	}

	render() {
		const { dispatch } = this.props;

		const disbleButtonClass = 'languageBtn btn btn-default disabled';
		const buttonClass = 'languageBtn btn btn-default';
		const languages = this.props.languages || [];

		console.log(' => NAV -> selectedLanguage: ', this.state.selectedLanguage);
		return (
		<nav className="container">
			<p className="text-left">
				<span id="laguages">
					<span onClick={this.onClickElement.bind(this)} data-language=''
						className={this.props.selectedLanguage === 'All' ? disbleButtonClass:buttonClass}>All</span>

					{languages.map((language, i) =>
	          <span onClick={this.onClickElement.bind(this)}
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Nav);
