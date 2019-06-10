import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import axios from 'axios';

import { Form, Checkbox, Button, Message, Card, TextArea } from 'semantic-ui-react'

import { config } from '../app/App';
import { checkAuthentication, formatServerError } from '../../helpers';

export default withAuth(class AddNewVote extends Component {
	constructor(props) {
		super(props);

		this.state = { error: null, loading: false, success: false,
			voteTitle: '', voteDescription: '', voteHidden: false };

		this.checkAuthentication = checkAuthentication.bind(this);
	}

	addNewVote = async () => {
		this.setState({ loading: true });

		try {
			const accessToken = await this.props.auth.getAccessToken();

			const { url, port } = config.resourceServer;
			await axios.post(`${url}:${port}/votes/add`, {
				title: this.state.voteTitle,
				description: this.state.voteDescription,
				hidden: this.state.voteHidden,
			}, { headers: { Authorization: `Bearer ${accessToken}` } });

			this.setState({ success: true });
		} catch (err) {
			console.error('submitVote', JSON.stringify(err));

			this.setState({ error: formatServerError(err) });
		} finally {
			this.setState({ loading: false });
		}
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

	render() {
		return (
			<Card fluid>
				<Card.Content>
					<Card.Header>Add Vote</Card.Header>
				</Card.Content>

				<Card.Content>
					<AddVoteForm
						error={this.state.error}
						success={this.state.success}
						loading={this.state.loading}
						voteTitle={this.state.voteTitle}
						voteDescription={this.state.voteDescription}
						addNewVote={this.addNewVote}
						handleInputChange={this.handleInputChange}
						handleCheckboxToggle={this.handleCheckboxToggle}
					/>
				</Card.Content>
			</Card>
		);
	}
});

class AddVoteForm extends Component {
	render() {
		return (
			<Form error={this.props.error !== null}
				loading={this.props.loading}
				success={this.props.success}
				onSubmit={this.props.addNewVote}
			>
				<Message error content={this.props.error} />

				<Message success content='Added vote successfully' />

				<Form.Field>
					<label>Title</label>
					<input placeholder='Short and descriptive vote title'
						name='voteTitle' value={this.props.voteTitle}
						onChange={this.props.handleInputChange} />
				</Form.Field>

				<Form.Field>
					<label>Description</label>
					<TextArea placeholder='A more detailed description of the vote'
						name='voteDescription' value={this.props.voteDescription}
						onChange={this.props.handleInputChange} />
				</Form.Field>

				<Form.Field width={14}>
					<Checkbox label='Hide vote' name='voteHidden'
						checked={this.props.voteHidden}
						onChange={this.props.handleCheckboxToggle} />
				</Form.Field>

				<Form.Field>
					<Button type='submit'>Add vote</Button>
				</Form.Field>
			</Form>
		);
	}
}
