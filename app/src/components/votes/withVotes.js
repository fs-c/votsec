import React, { Component } from 'react';

import axios from 'axios';

import { getDisplayName, buildApiString, formatServerError } from '../../helpers';

export default function withVotes(query = {}, interval = 10000) {
	return (WrappedComponent) => {
		class WithVotes extends Component {
			constructor(props) {
				super(props);

				this.state = { votes: [], error: null };
			}

			async componentDidMount() {
				this.getVotes();

				this.votesTimer = setInterval(() => this.getVotes(), interval);
			}

			async componentWillUnmount() {
				clearInterval(this.votesTimer);
			}

			getVotes = async () => {
				try {
					const uri = buildApiString('votes/get', query);
					const { data } = await axios.get(uri);

					this.setState({ votes: data, error: null });
				} catch (err) {
					console.error('getVotes', err);

					this.setState({ error: formatServerError(err) });
				}
			}

			render() {
				return (
					<WrappedComponent votes={this.state.votes}
						error={this.state.error} {...this.props} />
				);
			}
		}

		WithVotes.displayName = `WithVotes(${getDisplayName(WrappedComponent)})`;

		return WithVotes;
	};
};
