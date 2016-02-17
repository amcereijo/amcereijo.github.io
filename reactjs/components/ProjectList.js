import React, { Component, PropTypes } from 'react';

export default class ProjectList extends Component {
	render() {
		const bold = 'bold';

		return (
			<main id="main" className="container">
			{this.props.projects.map((project, i) => {
				return <div key={i} className="panel panel-default panelProject" data-projectname={project.name}>
					<div className="panel-heading project-name" style={{backgroundColor:project.color}}>
						<h3 className="panel-title" >{project.name}</h3>

						<span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>

						<span style={{fontWeight: bold}}>
							{project.language || 'Other'}
						</span>
					</div>
					<div className="panel-body">
						<blockquote>{project.description}</blockquote>
						<dl>
						 	<dt>Repo Url</dt>
							<dd><a href={project.html_url}>{project.html_url}</a></dd>
							<dt>Last update</dt>
							<dd>{project.updated_at}</dd>
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
			})}
			</main>
		);
	}
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired,
};

