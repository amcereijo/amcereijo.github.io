import React, { Component, PropTypes } from 'react';

export default class ProjectReadme extends Component {
	render() {
		return (
			<div className="more-stuff hide">
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
  readmeContent: PropTypes.string.isRequired,
};

