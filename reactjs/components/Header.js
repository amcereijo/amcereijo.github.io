import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
	render() {
		console.log('Header render this.props: ', this.props);
		console.log('Header render this.props.email: ', this.props.email);
		console.log('Header render this.props.location: ', this.props.location);
		return (
			<header className="container headerElement">

				<div className="row row-centered">
					<div className="col-xs-2 col-centered">
						<img className="profileImg img-thumbnail" src={this.props.avatar_url}/>
					</div>
					<div className="col-xs-10 col-centered">
						<h2>{this.props.name}</h2>
						<dl className="dl-horizontal profileData">
							<dt>Username:</dt>
							<dd>
								<a href={this.props.html_url}>{this.props.login}</a>
							</dd>
							<dt>Email:</dt>
							<dd>{this.props.email}</dd>
							<dt>Location:</dt>
							<dd>{this.props.location}</dd>
						</dl>
					</div>
				</div>

			</header>
		);
	}
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

