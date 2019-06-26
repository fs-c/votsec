import React, { useState, useContext } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import AddVote from '../votes/AddVote';

import { UserContext } from '../app/App';

const Navigation = ({ handleLogin, handleLogout }) => {
	const { loggedIn } = useContext(UserContext);
	const handler = loggedIn ? handleLogout : handleLogin;

	const [ addingVote, setAddingVote ] = useState(false);

	return (
		<>
			<Navbar bg='dark' variant='dark' expand='md'>
				<Container>
					<Navbar.Brand href='/' className=''>votsec</Navbar.Brand>

					<Navbar.Toggle aria-controls='collapsing-navbar' />

					<Navbar.Collapse id='collapsing-navbar'>
						<Nav>
							<Nav.Link disabled>About</Nav.Link>

							{loggedIn && [
								<Nav.Link key='addVote' onClick={() => setAddingVote(true)}>
									Add Vote
								</Nav.Link>,
								<Nav.Link key='profile' disabled href='/profile'>
									Profile
								</Nav.Link>,
							]}
						</Nav>

						<Nav className='ml-auto'>
							<Button variant='outline-light' onClick={handler}>
								{loggedIn ? 'Logout' : 'Login'}
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<AddVote show={addingVote}
				handleHide={() => setAddingVote(!addingVote)}
			/>
		</>
	);
};

export default Navigation;
