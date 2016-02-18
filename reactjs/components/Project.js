import React, { Component, PropTypes } from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectDescription from './ProjectDescription';
import ProjectReadme from './ProjectReadme';

export default class Project extends Component {
	constructor(props){
		super(props);
		this.state = { expanded: false };
	}

	clickExpand() {
		console.log('projectName: ', this.props.project.name);
		this.setState({expanded: !this.state.expanded});
	}

	render() {
		return (
			 <div className="panel panel-default panelProject" data-projectname={this.props.project.name}>
				<ProjectHeader visible={this.state.expanded} project={this.props.project} clickExpand={this.clickExpand.bind(this)} />
				<ProjectDescription project={this.props.project} />
				<ProjectReadme visible={this.state.expanded} readmeContent={this.props.readmeContent} />
			</div>
		);
	}
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  readmeContent: PropTypes.string,
};

Project.defaultProps = { readmeContent: 'README' };
