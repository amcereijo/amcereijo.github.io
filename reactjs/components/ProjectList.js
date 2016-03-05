import React, { Component, PropTypes } from 'react';
import Project from './Project';

export default class ProjectList extends Component {
	render() {
		const readme = this.props.readme || {};
		console.log('ProjectList: ', readme);
		return (
			<main id="main" className="container">
			{this.props.projects.map((project, i) =>

				<Project key={i}
					project={project}
					readmeContent={readme[project.name]}
					onExpandCollapsProject={this.props.onExpandCollapsProject}/>
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
  onExpandCollapsProject: PropTypes.func.isRequired,
};

