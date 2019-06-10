import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Item, Message, Divider, Icon, List, Grid, Header, Segment } from 'semantic-ui-react';

import { config } from '../app/App';
import { formatServerError } from '../../helpers'

export default class VoteList extends Component {
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
						<VoteItem vote={vote} key={vote._id} />
					))}
				{/* </Item.Group> */}

				<Divider />
			</React.Fragment>
		);
	}
};

class VoteItem extends Component {
	constructor(props) {
		super(props);

		this.vote = this.props.vote;
	}

	render() {
		const startDate = moment(this.vote.startDate).fromNow();
		const endDate = moment(this.vote.endDate).fromNow();

		return (
			<Segment basic>
				<Grid>
					<Grid.Column width={1}>
						<List>
							<Item><Icon circular link name='arrow up' color='green' /></Item>
							<Item><Icon circular link name='arrow down' color='red' /></Item>
						</List>
					</Grid.Column>

					<Grid.Column width={15}>
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
				</Grid>
			</Segment>
		);
	}
}
