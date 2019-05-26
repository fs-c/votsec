import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import { Divider } from 'semantic-ui-react';

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
            return <React.Fragment></React.Fragment>;
        
        return (
			<React.Fragment>
                {this.state.authenticated && <React.Fragment>
					<AddNewVote />
					<Divider hidden />
				</React.Fragment>}

				<VoteList />
			</React.Fragment>
		);
    }
});
