import React, { Component } from 'react';
import axios from 'axios';

import { Item } from 'semantic-ui-react';

import config from '../../.config';

export default class VotesList extends Component {
	constructor(props) {
		super(props);

		this.state = { votes: [] };
	}

	async componentDidMount() {
		this.getVotes();
	}

	async componentDidUpdate() {
		this.getVotes();
	}

	async getVotes() {
		const res = await axios.get(config.resourceServer.url + '/votes/get');

		this.setState({ votes: res.data });
	}

	render() {
		return (
			<Item.Group>
				{this.state.votes.map((vote) => (<Vote key={vote._id} vote={vote} />))}
			</Item.Group>
		);
	}
};

class Vote extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Item>
				<Item.Content>
					<Item.Header>{this.props.vote.title}</Item.Header>
					<Item.Description>
						{this.props.vote.description}
					</Item.Description>
				</Item.Content>
			</Item>
		);
	}
}
