import React, { Component } from 'react';

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';

import VotesList from './VotesList';

import withVotes from './withVotes'

export default class FilterableVotesList extends Component {
	constructor(props) {
		super(props);

		this.state = { searchFilter: '', actualFilter: '' };
	}

	handleSearchChange = ({ target }) => {
		this.setState({ searchFilter: target.value });

		this.updateActualFilter();
	}

	updateActualFilter = () => {
		console.log('called');

		this.setState((prev) => ({ actualFilter: prev.searchFilter }));
	}

	render() {
		const EnhancedVotesList = withVotes()(VotesList);

		return (
			<React.Fragment>
				<Form className='mb-3'>
					<Form.Row>
						<Col>
							<Form.Control placeholder='Search' value={this.state.searchFilter} onChange={this.handleSearchChange} />
						</Col>
					</Form.Row>
				</Form>

				<EnhancedVotesList filter={this.state.actualFilter} />
			</React.Fragment>
		)
	}
}
