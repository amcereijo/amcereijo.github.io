import React, { Component, PropTypes } from 'react';

export default class ProjectHeader extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	render() {
		const spanClasses = `glyphicon ${this.props.visible && this.props.project.isVisible !== false ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'}`;
		return (
		 	<div className="panel-heading project-name" style={{backgroundColor:this.props.project.languageColor}}>
				<h3 className="panel-title" >{this.props.project.name}</h3>

				<span onClick={this.props.clickExpand} className={spanClasses} aria-hidden="true"></span>

				<span style={{fontWeight: 'bold'}}>
					{this.props.project.language || 'Other'}
				</span>
			</div>
		);
	}
}

ProjectHeader.propTypes = {
	visible: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  clickExpand: PropTypes.func.isRequired,
};

