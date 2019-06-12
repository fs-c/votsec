import React, { Component } from 'react';

import { Menu, Container } from 'semantic-ui-react';

export default class Navbar extends Component {
    render() {
		const { loggedIn } = this.props;
		const name = loggedIn ? 'logout' : 'login';
		const handler = loggedIn ? this.props.handleLogin
			: this.props.handleLogout;

        return (
			<Menu size='large' inverted style={{ borderRadius: '0' }}>
				<Container>
					<Menu.Item name='votsec' content='votsec' header href="/" />

					{this.props.loggedIn &&
						<Menu.Item name='profile' href='/profile' />}

					<Menu.Menu position='right'>
						<Menu.Item name={name} onClick={handler} />
					</Menu.Menu>
				</Container>
			</Menu>
        );
    }
}
