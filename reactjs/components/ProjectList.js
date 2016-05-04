import React, { Component, PropTypes } from 'react';
import Project from './Project';

export default class ProjectList extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	render() {
		const {readme = {}, projects = [], profileName} = this.props;
		console.log('ProjectList - this.props.projects: ', this.props.projects);
		console.log('ProjectList - readme: ', readme);

		const createProject = (key, project) => {
			return <Project key={key}
				 		project={project}
				 		readmeContent={readme[project.name] || {}}
				 		profileName={profileName}/>
		}
		return (
			<main id="main" className="container">
			{projects.map((project, i) =>
				(project.isVisible) ? createProject(i, project) : ''
			)}
			</main>
		);
	}
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired,
  readme: PropTypes.object.isRequired,
  profileName: PropTypes.string.isRequired,
};
