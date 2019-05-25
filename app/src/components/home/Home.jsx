import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import { Button, Header } from 'semantic-ui-react';

import VotesList from '../votes/VotesList';
import AddNewVote from '../votes/AddNewVote';

import { checkAuthentication } from '../../helpers';

export default withAuth(class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { authenticated: null, userinfo: null };

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
        
        return (<div>
             <Header as="h1"><i>vot</i>sec index</Header>

            <div>
                {this.state.authenticated ? (
					<div>
						<p>Welcome back, {this.state.user.email}!</p>

						<AddNewVote />
						<VotesList />
					</div>
				) : (
					<div>
						<VotesList />

						<Button id="login-button" primary onClick={this.login}>
							Login</Button>
					</div>
				)}
            </div>
        </div>);
    }
});
