import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './ProjectHeader';
import ProjectDescription from './ProjectDescription';
import ProjectReadme from './ProjectReadme';
import { fetchReadmeIfNeeded } from '../actions/readmeActions';

class Project extends Component {
	constructor(props){
		super(props);
		this.state = { expanded: false };
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}

	clickExpand() {
		console.log('projectName: ', this.props.project.name);
		this.setState({expanded: !this.state.expanded}, () => {
			const { dispatch } = this.props;
			dispatch(fetchReadmeIfNeeded(this.props.profileName, this.props.project.name));
		});
	}

	render() {
		const classNames = 'panel panel-default panelProject';
		return (
			 <div className={classNames} data-projectname={this.props.project.name}>
				<ProjectHeader visible={this.state.expanded} project={this.props.project} clickExpand={this.clickExpand.bind(this)} />
				<ProjectDescription project={this.props.project} />
				<ProjectReadme visible={this.state.expanded}
					readmeContent={this.props.readmeContent.readme && this.props.readmeContent.readme.content || ''} />
			</div>
		);
	}
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  readmeContent: PropTypes.object,
  profileName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Project.defaultProps = { readmeContent: 'README' };

export default connect()(Project);