import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Message, Divider, Grid, Header, Segment } from 'semantic-ui-react';

import { config } from '../app/App';
import { formatServerError, formatVoteTimes } from '../../helpers'

export default class NewestVotesList extends Component {
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

	getVotes = async () => {
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

		this.setState({
			votes: this.state.votes.filter((vote) => vote._id !== name),
		});
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

				<VoteList votes={this.state.votes} />
			</React.Fragment>
		)
	}
}

class VoteList extends Component {
	render() {
		return (
			<React.Fragment>
				{this.props.votes.map((vote) => (
					<VoteListItem key={vote._id} {...vote} />
				))}

				<Divider hidden />
			</React.Fragment>
		);
	}
};

class VoteListItem extends Component {
	render() {
		return (
			<Segment basic>
				<Grid>
					<Grid.Column width={14}>
						<Header as={Link} to={{
							pathname: `/vote/${this.props._id}`,
							state: { vote: this.props },
						}}>
							{this.props.title}

							<Header.Subheader>
								{formatVoteTimes(this.props.startDate, this.props.endDate)}
							</Header.Subheader>
						</Header>

						<p>
							{this.props.description}
						</p>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}
