import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchProfileIfNeeded } from '../actions/profileActions';
import { fetchProjectsIfNeeded } from '../actions/projectsActions';
import { fetchReadmeIfNeeded } from '../actions/readmeActions';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import ProjectList from '../components/ProjectList';

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

	clickExpandCollapsProject(projectName) {
		const { dispatch } = this.props;
		dispatch(fetchReadmeIfNeeded(this.props.profileName, projectName));
	}

	render() {
		const filterFunction = (evt) => {
			console.log('Event:', evt.target.value);
		};
		const { profileName, data, isFetching, lastUpdated, projects, languages, readme } = this.props;
		console.log('Render languages: ', languages);
		console.log('Render data: ', data);
		return (
			<div>
				<Header name = {data.name || ''}
				  avatar_url = {data.avatar_url || ''}
				  login = {profileName || ''}
				  html_url = {data.html_url || ''}
				  email = {data.email || ''}
				  location = {data.location || ''} />
				<Nav languages={languages} filterFunction={filterFunction} />
				<ProjectList projects={projects} readme={readme} onExpandCollapsProject={this.clickExpandCollapsProject.bind(this)}/>
				<Footer />
			</div>
		);
	}
}

GithubApp.propTypes = {
	profileName: PropTypes.string.isRequired,
	//profile: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
	const { profileForName, projectsForName, readmeForProject } = state;
	console.log('====> profileForName: ', profileForName);
	const {
		isFetching,
		lastUpdated,
		data,
	} = profileForName.profile || {
		isFetching: true,
		data: {
			name: '',
		  avatar_url: '',
		  login: '',
		  html_url: '',
		  email: '',
		  location: '',
		},
 	};
 	console.log('====> projectsForName: ', projectsForName);
 	const {
 		projects,
 		languages,
 	} = projectsForName.projects || {
 		projects: [], languages: [],
 	}
 	const readme = readmeForProject || {
 		readme: {},
 	}

	return {
		data,
		projects,
		languages,
		readme,
		isFetching,
		lastUpdated,
	};
}

export default connect(mapStateToProps)(GithubApp);



