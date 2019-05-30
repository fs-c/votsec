import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ImplicitCallback, SecureRoute, Security } from '@okta/okta-react';

import { Container } from 'semantic-ui-react';

import config from '../../../../config.js';

import Home from '../home/Home';
import Navbar from '../navbar/Navbar';
import Profile from '../profile/Profile';

class App extends Component {
    render() {
        return (
            <Router>
                <Security
                    issuer={config.openID.issuer}
                    client_id={config.openID.client}
					redirect_uri={config.openID.redirect}
					scope={config.openID.scope.split(' ')}
                >
                    <Navbar />
					<Container text style={{ marginTop: '7em' }}>
                        <Route path="/" exact component={Home} />
                        <Route path="/implicit/callback" component={ImplicitCallback} />
                        <SecureRoute path="/profile" component={Profile} />
                    </Container>
                </Security>
            </Router>
        );
    }
}

export default App;
export { config };
