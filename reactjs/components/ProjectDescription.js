import React, { Component, PropTypes } from 'react';

export default class ProjectDescription extends Component {
	render() {
		return (
			<div className="panel-body">
				<blockquote>{this.props.project.description}</blockquote>
				<dl>
				 	<dt>Repo Url</dt>
					<dd><a href={this.props.project.html_url}>{this.props.project.html_url}</a></dd>
					<dt>Last update</dt>
					<dd>{this.props.project.updated_at}</dd>
				</dl>
			</div>
		);
	}
}

ProjectDescription.propTypes = {
  project: PropTypes.object.isRequired,
};
