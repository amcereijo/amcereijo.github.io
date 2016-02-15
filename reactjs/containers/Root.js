import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default class Root extends Component {
	render() {
		const languages = [
			{name: 'Javascript', color: 'blue'},
			{name: 'Java', color: 'red'},
		];
		return (
			<div>
				<Header name = "Angel Cereijo"
				  avatar_url = "https://avatars.githubusercontent.com/u/2098733?v=3"
				  login = "amcereijo"
				  html_url = "https://github.com/amcereijo"
				  email = "amcereijo@gmail.com"
				  location = "Madrid" />
				<Nav languages={languages} />
				<Footer />
			</div>
		);
	}
}