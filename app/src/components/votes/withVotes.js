import React, { Component } from 'react';

import axios from 'axios';

import { getDisplayName, buildApiString, formatServerError } from '../../helpers';

export default function withVotes(query = {}, interval = 10000) {
	return (WrappedComponent) => {
		class WithVotes extends Component {
			_isMounted = false;

			constructor(props) {
				super(props);

				this.state = { votes: [], error: null };
			}

			async componentDidMount() {
				this._isMounted = true;

				this.getVotes();

				this.votesTimer = setInterval(() => this.getVotes(), interval);
			}

			async componentWillUnmount() {
				this._isMounted = false; // Effectively, anyways

				clearInterval(this.votesTimer);
			}

			getVotes = async () => {
				if (this.props.filter)
					query.title = this.props.filter;				

				try {
					const uri = buildApiString('votes/get', query);
					const { data } = await axios.get(uri);

					if (this._isMounted)
						this.setState({ votes: data, error: null });
				} catch (err) {
					console.error('getVotes', err);

					if (this._isMounted)
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
