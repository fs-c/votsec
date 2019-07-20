import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ImplicitCallback, Security, withAuth } from '@okta/okta-react';

import Container from 'react-bootstrap/Container';

import config from '../../../../config.js';

import Home from '../home/Home';
import Navigation from '../navigation/Navigation';

const UserContext = React.createContext({
	id: null,
	token: null,
	admin: false,
	loggedIn: false,
});

const AppContainer = withAuth(class extends Component {
    constructor(props) {
        super(props);

        this.state = {
			loggedIn: false, admin: false, accessToken: null,
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
			if (!this.state.accessToken && loggedIn) {
				const user = await this.props.auth.getUser();
				const admin = (user.groups || []).includes('Admin');
				const accessToken = await this.props.auth.getAccessToken();

				this.setState({ loggedIn, admin, accessToken, id: user.id });
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
            <UserContext.Provider value={this.state}>
				<Navigation handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                />

				<Container fluid className='mt-3'>
					<Route path='/' exact
						render={(props) => (
							<Home {...props} />
						)}
					/>
				</Container>

				<Route path='/implicit/callback' component={ImplicitCallback} />
            </UserContext.Provider>
        );
    }
});

export default class App extends Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
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

export { UserContext, config };
