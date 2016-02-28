import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchProfileIfNeeded } from '../actions/profileActions';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import ProjectList from '../components/ProjectList';
import projectsMock from '../mocks/projects';

class GithubApp extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchProfileIfNeeded(this.props.profileName));
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.profileName !== this.props.profileName) {
			const { dispatch, profileName } = nextProps;
			dispatch(fetchProfileIfNeeded(profileName));
		}
	}

	render() {
		const languages = [
			{name: 'Javascript', color: 'blue'},
			{name: 'Java', color: 'red'},
		];
		const filterFunction = (evt) => {
			console.log('Event:', evt.target.value);
		};
		const { profileName, data, isFetching, lastUpdated } = this.props;

		return (
			<div>
				<Header name = {data.name}
				  avatar_url = {data.avatar_url}
				  login = {profileName}
				  html_url = {data.html_url}
				  email = {data.email}
				  location = {data.location} />
				<Nav languages={languages} filterFunction={filterFunction} />
				<ProjectList projects={projectsMock} />
				<Footer />
			</div>
		);
	}
}

GithubApp.propTypes = {
	profileName: PropTypes.string.isRequired,
	profile: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
	const { profileForName } = state;
	const {
		isFetching,
		lastUpdated,
		data,
	} = profileForName.profile || {
		isFetching: true,
		data: {},
 	};

	return {
		data,
		isFetching,
		lastUpdated,
	};
}

export default connect(mapStateToProps)(GithubApp);



