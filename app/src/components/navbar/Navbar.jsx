import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function ({ loggedIn, handleLogin, handleLogout }) {
	const handler = loggedIn ? handleLogout : handleLogin;

	return (
		<Navbar bg='dark' variant='dark' expand='md'>
			<Container>
				<Navbar.Brand href='/' className=''>votsec</Navbar.Brand>

				<Navbar.Toggle aria-controls='collapsing-navbar' />

				<Navbar.Collapse id='collapsing-navbar'>
					<Nav>
						{loggedIn &&
							<Nav.Link href='/profile'>Profile</Nav.Link>}

						<Nav.Link disabled>About</Nav.Link>
					</Nav>

					<Nav className='ml-auto'>
						<Nav.Link onClick={handler}>
							{loggedIn ? 'Logout' : 'Login'}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
