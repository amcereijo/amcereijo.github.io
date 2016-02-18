import React, { Component, PropTypes } from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectDescription from './ProjectDescription';
import ProjectReadme from './ProjectReadme';

export default class Project extends Component {
	render() {
		return (
			 <div className="panel panel-default panelProject" data-projectname={this.props.project.name}>
				<ProjectHeader project={this.props.project} />
				<ProjectDescription project={this.props.project} />
				<ProjectReadme readmeContent={this.props.readmeContent || 'README'} />
			</div>
		);
	}
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  readmeContent: PropTypes.string,
};

