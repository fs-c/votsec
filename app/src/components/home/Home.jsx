import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';

import PopularVotes from '../votes/PopularVotes';

export default class Home extends Component {
    render() {
        return (
			<React.Fragment>
				<Container>
					<PopularVotes />
				</Container>
			</React.Fragment>
		);
    }
};
