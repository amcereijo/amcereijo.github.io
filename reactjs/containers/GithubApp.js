import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchProfileIfNeeded } from '../actions/profileActions';
import { fetchProjectsIfNeeded } from '../actions/projectsActions';

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
		dispatch(fetchProjectsIfNeeded(this.props.profileName));
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.profileName !== this.props.profileName) {
			const { dispatch, profileName } = nextProps;
			dispatch(fetchProfileIfNeeded(profileName));
			dispatch(fetchProjectsIfNeeded(this.props.profileName));
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
		const { profileName, data, isFetching, lastUpdated, projects } = this.props;

		return (
			<div>
				<Header name = {data.name}
				  avatar_url = {data.avatar_url}
				  login = {profileName}
				  html_url = {data.html_url}
				  email = {data.email}
				  location = {data.location} />
				<Nav languages={languages} filterFunction={filterFunction} />
				<ProjectList projects={projects} />
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
	const { profileForName, projectsForName } = state;
	const {
		isFetching,
		lastUpdated,
		data,
	} = profileForName.profile || {
		isFetching: true,
		data: {},
 	};
 	const {
 		projects
 	} = projectsForName.projects || {
 		isFetching: true,
 		projects: [],
 	}

	return {
		data,
		projects,
		isFetching,
		lastUpdated,
	};
}

export default connect(mapStateToProps)(GithubApp);



