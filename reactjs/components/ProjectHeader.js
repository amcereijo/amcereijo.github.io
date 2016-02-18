import React, { Component, PropTypes } from 'react';

export default class ProjectHeader extends Component {
	onClick(projectName) {
		console.log('projectName: ', projectName);
	}

	render() {
		return (
		 	<div className="panel-heading project-name" style={{backgroundColor:this.props.project.color}}>
				<h3 className="panel-title" >{this.props.project.name}</h3>

				<span onClick={this.onClick.bind(this, this.props.project.name)} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>

				<span style={{fontWeight: 'bold'}}>
					{this.props.project.language || 'Other'}
				</span>
			</div>
		);
	}
}

ProjectHeader.propTypes = {
  project: PropTypes.object.isRequired,
};

