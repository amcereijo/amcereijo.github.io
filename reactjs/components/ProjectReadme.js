import React, { Component, PropTypes } from 'react';
import marked from 'marked';

export default class ProjectReadme extends Component {
	createMarkup() {
		const markdownContent = atob(this.props.readmeContent);
		return {__html: marked(markdownContent)};
	}

	render() {
		const principalClasses = `more-stuff ${this.props.visible? '' : 'hide'}`;
		return (
			<div className={principalClasses}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title" >README.md</h3>
					</div>
					<div className="panel-body" dangerouslySetInnerHTML={this.createMarkup()}>
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

