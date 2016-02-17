import React, { Component, PropTypes } from 'react';

export default class Project extends Component {
	render() {
		return (
			 <div key={this.props.key} className="panel panel-default panelProject" data-projectname={this.props.project.name}>
				<div className="panel-heading project-name" style={{backgroundColor:this.props.project.color}}>
					<h3 className="panel-title" >{this.props.project.name}</h3>

					<span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>

					<span style={{fontWeight: 'bold'}}>
						{this.props.project.language || 'Other'}
					</span>
				</div>
				<div className="panel-body">
					<blockquote>{this.props.project.description}</blockquote>
					<dl>
					 	<dt>Repo Url</dt>
						<dd><a href={this.props.project.html_url}>{this.props.project.html_url}</a></dd>
						<dt>Last update</dt>
						<dd>{this.props.project.updated_at}</dd>
					</dl>
				</div>
				<div className="more-stuff hide">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title" >README.md</h3>
						</div>
						<div className="panel-body">

						</div>
					</div>
				</div>
			</div>
		);
	}
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
};

