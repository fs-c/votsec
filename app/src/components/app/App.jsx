import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ImplicitCallback, Security, withAuth } from '@okta/okta-react';

import Container from 'react-bootstrap/Container';

import config from '../../../../config.js';

import Home from '../home/Home';
import Navbar from '../navbar/Navbar';

const AppContainer = withAuth(class extends Component {
    constructor(props) {
        super(props);

        this.state = {
			loggedIn: false, admin: false, user: null, accessToken: undefined,
		};
	}

	async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
	}

	// Expects `auth` prop to be injected through `withAuth`
	checkAuthentication = async () => {
		const loggedIn = await this.props.auth.isAuthenticated();

		// Only execute once the auth status changed
		if (loggedIn !== this.state.loggedIn) {
			if (!this.state.user && loggedIn) {
				const user = await this.props.auth.getUser();
				const admin = (user.groups || []).includes('Admin');
				const accessToken = await this.props.auth.getAccessToken();

				this.setState({ loggedIn, user, admin, accessToken });
			} else {
				this.setState({ loggedIn });
			}
		}
	}

	handleLogin = () => {
		this.props.auth.login('/');
	}

	handleLogout = () => {
		this.props.auth.login('/');
	}

    render() {
        return (
            <React.Fragment>
				<Navbar loggedIn={this.state.loggedIn}
					handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />

				<Container fluid style={{ marginTop: '1rem' }}>
					<Route path='/' exact
						render={(props) => (
							<Home {...props}
								accessToken={this.state.accessToken}
							/>
						)}
					/>
				</Container>

				<Route path='/implicit/callback' component={ImplicitCallback} />
            </React.Fragment>
        );
    }
});

export default class App extends Component {
    render() {
        return (
            <Router>
                <Security
                    issuer={config.openID.issuer}
                    client_id={config.openID.client}
					redirect_uri={config.openID.redirect}
					scope={config.openID.scope.split(' ')}
                >
                    {/* TODO: Not a nice solution */}
                    <AppContainer />
                </Security>
            </Router>
        );
    }
}

export { config };
