import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import axios from 'axios';

import { Form, Checkbox, Button, Message, Card } from 'semantic-ui-react'

import config from '../../.config';
import { checkAuthentication } from '../../helpers';

export default withAuth(class AddNewVote extends Component {
	constructor(props) {
		super(props);

		this.state = { error: null, loading: false };

		this.checkAuthentication = checkAuthentication.bind(this);
	}

	addNewVote = async () => {
		this.checkAuthentication();

		console.log('adding new vote');

		this.setState({ loading: true });

		try {
			const accessToken = await this.props.auth.getAccessToken();

			await axios.post(config.resourceServer.url + '/votes/add', {
				title: this.state.voteTitle,
				description: this.state.voteDescription,
				hidden: this.state.voteHidden,
			}, { headers: { Authorization: `Bearer ${accessToken}` } });

			console.log('added new vote');
		} catch (err) {
			console.error('submitVote', err);

			this.setState({ error: err.message });
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>Add Vote</Card.Header>
				</Card.Content>

				<Card.Content>
					<AddVoteForm error={this.state.error}
						loading={this.state.loading} addNewVote={this.addNewVote}
					/>
				</Card.Content>
			</Card>
		);
	}
});

class AddVoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			voteTitle: '', voteDescription: '', voteHidden: false,
		};
	}

	handleInputChange = (event) => {
		const name = event.target.name;

		this.setState({
			[name]: event.target.value,
		});
	}

	// TODO: Implement generic handler
	handleCheckboxToggle = () => {
		this.setState((prevState) => ({ voteHidden: !prevState.voteHidden }));
	}

	// TODO: This shouldn't mutate the error state
	handleMessageDismiss = () => {
		this.setState({ error: null });
	}

	render() {
		return (
			<Form error={this.props.error !== null} loading={this.props.loading}
				onSubmit={this.props.addNewVote}
			>
				<Message error content={this.props.error}
					onDismiss={this.handleMessageDismiss}
				/>

				<Form.Field>
					<label>Title</label>
					<input placeholder='Short and descriptive vote title'
						name='voteTitle' value={this.state.voteTitle}
						onChange={this.handleInputChange} />
				</Form.Field>

				<Form.Field>
					<label>Description</label>
					<input placeholder='A more detailed description of the vote'
						name='voteDescription' value={this.state.voteDescription}
						onChange={this.handleInputChange} />
				</Form.Field>

				<Form.Field width={14}>
					<Checkbox label='Hide vote' name='voteHidden'
						checked={this.state.voteHidden}
						onChange={this.handleCheckboxToggle} />
				</Form.Field>
				
				<Form.Field>
					<Button type='submit'>Add vote</Button>
				</Form.Field>
			</Form>
		);
	}
}
