import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import withVotes from '../../withVotes';
import { formatVoteTimes } from '../../helpers';

export default withVotes({ popular: true })(class PopularVotes extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='row justify-content-center align-items-center'>
					<Alert show={this.props.error !== null} variant='danger'
						className='md-auto'
					>
						Failed to load votes: {this.props.error}
					</Alert>
				</div>

				{this.props.votes && (
					<CardColumns>
						{this.props.votes.map((vote) => (
							<PopularVoteItem key={vote._id} {...vote} />
						))}
					</CardColumns>
				)}
			</React.Fragment>
		);
	}
});

function PopularVoteItem({ title, startDate, endDate }) {
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
}
