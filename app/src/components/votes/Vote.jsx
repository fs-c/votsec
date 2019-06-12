import React, { Component } from 'react';

export default class Vote extends Component {
	render() {
		return (
			<h1>{this.props.match.params.key}</h1>
		)
	}
};
