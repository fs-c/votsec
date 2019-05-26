import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import VoteList from '../votes/VoteList';
import AddNewVote from '../votes/AddNewVote';

import { checkAuthentication } from '../../helpers';

export default withAuth(class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { authenticated: null, user: null };

        this.login = this.login.bind(this);
        this.checkAuthentication = checkAuthentication.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/');
    }

    render() {
        if (this.state.authenticated === null)
            return <div></div>;
        
        return (
            <div>
                {this.state.authenticated ? (
					<div>
						<p>Welcome back, {this.state.user.email}!</p>

						<AddNewVote />
						<VoteList />
					</div>
				) : (
					<VoteList />
				)}
            </div>
		);
    }
});
