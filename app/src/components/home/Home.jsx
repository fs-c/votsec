import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import VotesGroup from '../votes/VotesGroup';
import FilterableVotesList from '../votes/FilterableVotesList';

import withVotes from '../votes/withVotes';

const PopularVotesGroup = withVotes({ popular: true })(VotesGroup);

export default class Home extends Component {
    render() {
        return (
			<React.Fragment>
				<Container>
					<Jumbotron className='pb-4 pt-4'>
						<p className='lead'>Popular Votes</p>

						<PopularVotesGroup />
					</Jumbotron>

					<FilterableVotesList />
				</Container>
			</React.Fragment>
		);
    }
};
