import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Item, Message } from 'semantic-ui-react';

import config from '../../.config';

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
		const res = await axios.get(config.resourceServer.url + '/votes/get');

		if (res.status !== 200) {
			return this.setState({ error: 'Failed getting votes: ' + res.statusText });
		} else this.setState({ error: null });

		this.setState({ votes: res.data });
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

				<Item.Group divided relaxed>
					{this.state.votes.map((vote) => (
						<VoteItem vote={vote} key={vote._id} />
					))}
				</Item.Group>
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
			// <List.Item>
			// 	<List.Content>
			// 		<List.Header>{this.props.vote.title}</List.Header>
			// 		<List.Description>{this.props.vote.description}</List.Description>
			// 	</List.Content>
			// </List.Item>

			// <List.Item header={this.props.vote.title} description={this.props.vote.description} />

			<Item>
				<Item.Content>
					<Item.Header as='a'>{this.vote.title}</Item.Header>
					<Item.Meta>Started {startDate}, ending {endDate}</Item.Meta>
					<Item.Description>{this.vote.description}</Item.Description>
				</Item.Content>
			</Item>
		);
	}
}
