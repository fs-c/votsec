import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import axios from 'axios';
import moment from 'moment';

import {
	Item, Message, Divider, Icon, List, Grid, Header, Segment, Dropdown, Form, Card, TextArea, Checkbox, Button
} from 'semantic-ui-react';

import { AddVoteForm } from './AddNewVote';

import { config } from '../app/App';
import { formatServerError } from '../../helpers'

export default withAuth(class VoteList extends Component {
	constructor(props) {
		super(props);

		this.interval = 1000 * 10;

		this.state = { votes: [], error: null };
	}

	async componentDidMount() {
		this.getVotes();

		this.timerID = setInterval(() => this.getVotes(), this.interval);
	}

	async componentWillUnmount() {
		clearInterval(this.timerID);
	}

	async getVotes() {
		const { url, port } = config.resourceServer;

		try {
			const res = await axios.get(`${url}:${port}/votes/get`);

			this.setState({ votes: res.data, error: null });
		} catch (err) {
			console.error('getVotes', err);

			this.setState({ error: formatServerError(err) });
		}
	}

	deleteVote = async (e, { name }) => {
		const { url, port } = config.resourceServer;
		const accessToken = await this.props.auth.getAccessToken();

		try {
			await axios.delete(`${url}:${port}/votes/delete/${name}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
		} catch (err) {
			console.error('deleteVote', err);

			this.setState({ error: formatServerError(err) });
		}

		this.setState({ votes: this.state.votes.filter((vote) => vote._id != name) });
	}

	handleMessageDismiss = () => {
		this.setState({ error: null });
	}

	render() {
		return (
			<React.Fragment>
				<Message error content={this.state.error}
					hidden={this.state.error === null}
					onDismiss={this.handleMessageDismiss}
				/>

				{/* <Item.Group divided> */}
					{this.state.votes.map((vote) => (
						<VoteItem vote={vote} key={vote._id}
							isAdmin={this.props.isAdmin}
							handleDeletion={this.deleteVote}
						/>
					))}
				{/* </Item.Group> */}

				<Divider />
			</React.Fragment>
		);
	}
});

class VoteItem extends Component {
	constructor(props) {
		super(props);

		const vote = this.vote = this.props.vote;

		this.state = { editing: false, ...vote };
	}

	toggleEditing = () => {
		this.setState((prev) => ({ editing: !prev.editing }));
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
		const startDate = moment(this.vote.startDate).fromNow();
		const endDate = moment(this.vote.endDate).fromNow();

		return (
			!this.state.editing ? (<Segment basic>
				<Grid>
					<Grid.Column width={1}>
						<List>
							<Item><Icon circular link name='arrow up' color='green' /></Item>
							<Item><Icon circular link name='arrow down' color='red' /></Item>
						</List>
					</Grid.Column>

					<Grid.Column width={14}>
						<Header as='h2'>
							{this.vote.title}

							<Header.Subheader>
								Started {startDate}, ending {endDate}
							</Header.Subheader>
						</Header>

						<p>
							{this.vote.description}
						</p>
					</Grid.Column>

					<Grid.Column width={1}>
						<Dropdown icon='caret down' floating onClick={this.handleDropdownClick}>
							<Dropdown.Menu>
								<Dropdown.Item disabled={true}>Bookmark</Dropdown.Item>
								<Dropdown.Item disabled={true}>Share</Dropdown.Item>
								{this.props.isAdmin && <Dropdown.Divider />}
								{this.props.isAdmin && <Dropdown.Item onClick={this.toggleEditing}>Edit</Dropdown.Item>}
								{this.props.isAdmin && <Dropdown.Item name={this.props.vote._id} onClick={this.props.handleDeletion}>Delete</Dropdown.Item>}
							</Dropdown.Menu>
						</Dropdown>
					</Grid.Column>
				</Grid>
			</Segment>) : (<Card fluid><Card.Content><Form>
				<Message error content={this.props.error} />

				<Form.Field>
					<input name='voteTitle' value={this.state.title}
						onChange={this.handleInputChange} />
				</Form.Field>

				<Form.Field>
					<TextArea name='voteDescription' value={this.state.description}
						onChange={this.handleInputChange} />
				</Form.Field>

				<Form.Field width={14}>
					<Checkbox label='Hide vote' name='voteHidden'
						checked={this.state.hidden}
						onChange={this.handleCheckboxToggle} />
				</Form.Field>

				<Form.Field>
					<Button type='submit' loading={this.state.loading}>
						Edit vote
					</Button>
				</Form.Field>
			</Form></Card.Content></Card>)
		);
	}
}
