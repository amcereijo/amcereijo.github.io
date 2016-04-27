import React, { Component, PropTypes } from 'react';

export default class ProjectDescription extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	render() {
		return (
			<div className="panel-body">
				<blockquote>{this.props.project.description}</blockquote>
				<dl>
				 	<dt>Repo Url</dt>
					<dd><a href={this.props.project.html_url}>{this.props.project.html_url}</a></dd>
					<dt>Last update</dt>
					<dd>{this.props.project.updated_at_formated}</dd>
				</dl>
			</div>
		);
	}
}

ProjectDescription.propTypes = {
  project: PropTypes.object.isRequired,
};
