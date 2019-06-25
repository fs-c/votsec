import React, { Component } from 'react';

import debounce from 'lodash/debounce';

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';

import VotesList from './VotesList';

import withVotes from './withVotes'

const EnhancedVotesList = withVotes()(VotesList);

export default class FilterableVotesList extends Component {
	constructor(props) {
		super(props);

		this.state = { searchFilter: '', actualFilter: '' };
		this.updateActualFilter = debounce(this.updateActualFilter, 200).bind(this);
	}

	handleSearchChange = ({ target }) => {
		this.setState({ searchFilter: target.value });

		this.updateActualFilter();
	}

	updateActualFilter = () => {
		this.setState((prev) => ({ actualFilter: prev.searchFilter }));
	}

	render() {
		return (
			<React.Fragment>
				<Form className='mb-3'>
					<Form.Row>
						<Col>
							<Form.Control placeholder='Search all votes'
								value={this.state.searchFilter}
								onChange={this.handleSearchChange}
							/>
						</Col>
					</Form.Row>
				</Form>

				<EnhancedVotesList filter={this.state.actualFilter} />
			</React.Fragment>
		)
	}
}
