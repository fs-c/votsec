import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import VotesGroup from '../votes/VotesGroup';
import VotesList from '../votes/VotesList';

import withVotes from '../../withVotes';

export default class Home extends Component {
    render() {
		const PopularVotesGroup = withVotes({ popular: true })(VotesGroup);
		const FilterableVotesList = withVotes()(VotesList);

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
