import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import axios from 'axios';

import { Form, Checkbox, Button } from 'semantic-ui-react'

import config from '../../.config';
import { checkAuthentication } from '../../helpers';

export default withAuth(class AddNewVote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			submitting: false, error: null,
			voteTitle: '', voteDescription: '', voteHidden: false,
		};

		this.checkAuthentication = checkAuthentication.bind(this);
	}

	handleInputChange = (event) => {
		const name = event.target.name;

		this.setState({
			[name]: event.target.value,
		});
	}

	handleCheckboxToggle = () => {
		this.setState((prevState) => ({ voteHidden: !prevState.voteHidden }));
	}

	addNewVote = async () => {
		this.checkAuthentication();

		this.setState({ submitting: true });

		try {
			const accessToken = await this.props.auth.getAccessToken();

			console.log(accessToken);

			await axios.post(config.resourceServer.url + '/votes/add', {
				title: this.state.voteTitle,
				description: this.state.voteDescription,
				hidden: this.state.voteHidden,
			}, { headers: { Authorization: `Bearer ${accessToken}` } });
		} catch (err) {
			console.error('submitVote', err);

			this.setState({ error: err.message });
		} finally {
			this.setState({ submitting: false });
		}
	}

	render() {
		return (
			<Form onSubmit={this.submitVote}>
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

				<Form.Field>
					<Checkbox label='Hide vote' name='voteHidden'
						checked={this.state.voteHidden}
						onChange={this.handleCheckboxToggle} />
				</Form.Field>

				<Button type='submit' primary>Add vote</Button>
			</Form>
		);
	}
});
