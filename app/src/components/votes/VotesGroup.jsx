import React from 'react';

import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import ErrorMessage from '../ErrorMessage';

import { formatVoteTimes } from '../../helpers';

const VotesGroup = ({ error, votes }) => {
	return (
		<>
			<ErrorMessage error={error} prefix='Failed to refresh votes: ' />

			{votes && (
				<CardColumns>
					{votes.map((vote) => (
						<VotesGroupItem key={vote._id} {...vote} />
					))}
				</CardColumns>
			)}
		</>
	);
};

const VotesGroupItem = ({ title, startDate, endDate }) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title className='m-0'>
					<strong>{title}</strong>
				</Card.Title>
			</Card.Body>

			<Card.Footer>
				<small className="text-muted">
					{formatVoteTimes(startDate, endDate)}
				</small>
			</Card.Footer>
		</Card>
	);
};

export default VotesGroup;
