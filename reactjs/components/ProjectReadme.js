import React, { Component, PropTypes } from 'react';

export default class ProjectReadme extends Component {
	render() {
		const principalClasses = `more-stuff ${this.props.visible? '' : 'hide'}`;
		return (
			<div className={principalClasses}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title" >README.md</h3>
					</div>
					<div className="panel-body">
					{this.props.readmeContent}
					</div>
				</div>
			</div>
		);
	}
}

ProjectReadme.propTypes = {
  readmeContent: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

