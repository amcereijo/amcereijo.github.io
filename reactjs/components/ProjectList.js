import React, { Component, PropTypes } from 'react';
import Project from './Project';

export default class ProjectList extends Component {
	render() {
		return (
			<main id="main" className="container">
			{this.props.projects.map((project, i) =>
				<Project key={i} project={project} />
			)}
			</main>
		);
	}
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired,
};

