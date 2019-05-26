import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import { Container, Menu } from 'semantic-ui-react';

import { checkAuthentication } from '../../helpers';

export default withAuth(class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { authenticated: null };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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

    async logout() {
        this.props.auth.logout('/');
    }

    render() {
        return (
			<Menu fixed='top' size='large' inverted><Container>
				<Menu.Item as="a" header href="/">
					<i>vot</i>sec
				</Menu.Item>

				{this.state.authenticated === true &&
					<Menu.Item name='profile' href='/profile' />}

				<Menu.Menu position='right'>
					{this.state.authenticated === true ? (
						<Menu.Item name='logout' onClick={this.logout} />
					) : (
						<Menu.Item name='login' onClick={this.login} />
					)}
				</Menu.Menu>
			</Container></Menu>
        );
    }
});
