import React from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import VotesGroup from '../votes/VotesGroup';
import FilterableVotesList from '../votes/FilterableVotesList';

import withVotes from '../votes/withVotes';

const PopularVotesGroup = withVotes({ popular: true })(VotesGroup);

const Home = ({ loggedIn }) => {
	return (
		<>
			<Container>
				<Jumbotron className='pb-4 pt-4'>
					<p className='lead'>Popular Votes</p>

					<PopularVotesGroup />
				</Jumbotron>

				<div className='pb-5'>
					<FilterableVotesList />
				</div>
			</Container>
		</>
	);
}

export default Home;
