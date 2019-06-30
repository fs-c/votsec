import React, { Component } from 'react';

import axios from 'axios';

import { getDisplayName, buildApiString, formatServerError } from '../../helpers';

// TODO: Rather hacky, maybe replace with a more concise lodash function?
// 		 Also still allows empty strings, which for now is necessary as
//		 an actually empty query item wouldn't be updated
const filterQuery = (query) => {
	return Object.keys(query).reduce((acc, cur) => {
		const v = query[cur];

		if (v === undefined)
			return acc;

		acc[cur] = v;
		return acc;
	}, {});
};

export default function withVotes(query = {}, interval = 10000) {
	const functionQuery = filterQuery(query);

	return (WrappedComponent) => {
		class WithVotes extends Component {
			_isMounted = false;

			constructor(props) {
				super(props);

				this.state = { votes: [], error: null };
			}

			async componentDidMount() {
				this._isMounted = true;

				this.getPropQuery();
				this.getVotes();

				this.votesTimer = setInterval(() => this.getVotes(), interval);
			}

			async componentWillUnmount() {
				this._isMounted = false; // Effectively, anyways

				clearInterval(this.votesTimer);
			}

			async componentDidUpdate(prevProps) {
				this.getPropQuery();

				if (prevProps.filter !== this.props.filter) {
					this.getVotes();
				}
			}

			getPropQuery = () => {
				const { popular, filter } = this.props;
				this.propQuery = filterQuery({ popular, filter });
			}

			getVotes = async () => {
				const actualQuery = Object.assign(functionQuery,
					this.propQuery);

				try {
					const uri = buildApiString('votes/get', actualQuery);
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
