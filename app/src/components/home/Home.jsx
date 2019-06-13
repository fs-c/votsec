import React, { Component } from 'react';

import { Divider } from 'semantic-ui-react';

import NewestVotesList from '../votes/VoteList';
import AddNewVote from '../votes/AddNewVote';

export default class Home extends Component {
    render() {
        return (
			<React.Fragment>
                {this.props.showAddVote && (
					<React.Fragment>
						<AddNewVote accessToken={this.props.accessToken} />
						<Divider hidden />
					</React.Fragment>
				)}

				<NewestVotesList />
			</React.Fragment>
		);
    }
};
