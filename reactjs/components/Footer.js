import React, { Component } from 'react';

export default class Header extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props;
	}

	render() {
		return (
			<footer>
				<p className="text-center"><a href="https://pages.github.com/">https://pages.github.com/</a></p>
			</footer>
		);
	}
}
