import React, { Component } from 'react';

import axios from 'axios';
import { Card, Button, Divider, Message } from 'semantic-ui-react';

import { buildApiString, formatVoteTimes, formatServerError } from '../../helpers';

export default class Vote extends Component {
	constructor(props) {
		super(props);

		this.state = { error: null, loadingDelete: false };

		if (!this.props.location) {
			this.setState({ fromAuth: true });
		} else {
			this.vote = this.props.location.state.vote;
			this.setState({ votingEnabled: this.vote.endDate > Date.now() });
		}
	}

	deleteVote = async () => {
		this.setState({ loadingDelete: true, error: null });

		try {
			const uri = buildApiString(`votes/delete/${this.vote._id}`);
			await axios.delete(uri, {
				headers: { Authorization: `Bearer ${this.props.accessToken}` },
			});

			this.props.handleDeletion();
		} catch (err) {
			console.error('deleteVote', err);

			this.setState({ error: formatServerError(err) });
		} finally {
			this.setState({ loadingDelete: false });
		}
	}

	render() {


		const vote = this.vote || {
			title: 'Vote title',
			description: 'A more detailed description of the vote'
		};

		return (
			<React.Fragment>
				<Button disabled loading={this.state.loadingDelete}
					onClick={this.deleteVote} content='Delete' color='red'
				/>

				<Button disabled content='Edit' color='yellow' />

				<Divider hidden />

				<Message error content={this.state.error}
					hidden={this.state.error === null}
				/>

				<Card fluid>
					<Card.Content>
						<Card.Header content={vote.title} />

						<Card.Meta content={formatVoteTimes(vote.startDate, vote.endDate)} />

						<Card.Description  content={vote.description} />
					</Card.Content>

					<Card.Content extra>
						<div className='ui two buttons'>
							<Button content='Yay' basic color='green'
								disabled={!this.state.votingEnabled}
							/>

							<Button content='Nay' basic color='red'
								disabled={!this.state.votingEnabled}
							/>
						</div>
					</Card.Content>
				</Card>
			</React.Fragment>
		);
	}
};
