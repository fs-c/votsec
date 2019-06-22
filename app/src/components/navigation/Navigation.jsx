import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Navigation = ({ loggedIn, handleLogin, handleLogout }) => {
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
						<Button variant='outline-light' onClick={handler}>
							{loggedIn ? 'Logout' : 'Login'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
