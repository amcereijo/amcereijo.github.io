import React, { Component } from 'react';
import Header from '../components/Header';

export default class Root extends Component {
	render() {
		return (
			<Header name = "Angel Cereijo"
			  avatar_url = "https://avatars.githubusercontent.com/u/2098733?v=3"
			  login = "amcereijo"
			  html_url = "https://github.com/amcereijo"
			  email = "amcereijo@gmail.com"
			  location = "Madrid" />
		);
	}
}