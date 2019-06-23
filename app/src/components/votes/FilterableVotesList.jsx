import React, { Component } from 'react';

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import VotesList from './VotesList';

import withVotes from './withVotes'

export default class FilterableVotesList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const EnhancedVotesList = withVotes()(VotesList);

		return (
			<React.Fragment>
				<Form className='mb-3'>
					<Form.Row>
						<Col>
							<Form.Control placeholder='Search' />
						</Col>
					</Form.Row>
				</Form>

				<EnhancedVotesList />
			</React.Fragment>
		)
	}
}
