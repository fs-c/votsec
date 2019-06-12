import React, { Component } from 'react';

import { Divider } from 'semantic-ui-react';

import VoteList from '../votes/VoteList';
import AddNewVote from '../votes/AddNewVote';

export default class Home extends Component {
    render() {
        return (
			<React.Fragment>
                {this.props.showAddVote && (
					<React.Fragment>
						<AddNewVote />
						<Divider hidden />
					</React.Fragment>
				)}

				<VoteList isAdmin={this.props.allowVoteEditing} />
			</React.Fragment>
		);
    }
};
