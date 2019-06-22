import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import ErrorMessage from '../ErrorMessage';

import { formatVoteTimes } from '../../helpers';

const PopularVotesGroup = ({ error, votes }) => {
	return (
		<React.Fragment>
			<ErrorMessage error={error}/>

			{votes && (
				<CardColumns>
					{votes.map((vote) => (
						<PopularVoteItem key={vote._id} {...vote} className='mb-1' />
					))}
				</CardColumns>
			)}
		</React.Fragment>
	);
};

const PopularVoteItem = ({ title, startDate, endDate }) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title style={{ margin: '0' }}>
					<strong>{title}</strong>
				</Card.Title>
			</Card.Body>

			<Card.Footer>
				<small className="text-muted">
					{formatVoteTimes(startDate, endDate)}
				</small>
			</Card.Footer>
		</Card>
	)
};

export default PopularVotesGroup;
