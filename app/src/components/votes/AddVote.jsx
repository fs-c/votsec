import React, { useState, useContext } from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ErrorMessage from '../ErrorMessage';

import { UserContext } from '../app/App';
import { buildApiString } from '../../helpers';

const AddVote = ({ show, handleHide }) => {
	const { accessToken } = useContext(UserContext);

	const [ error, setError ] = useState(null);
	const [ voteTitle, setVoteTitle ] = useState('');

	const handleTitleChange = ({ target }) => {
		setVoteTitle(target.value);
	};

	const handleAddVote = async () => {
		try {
			await axios.post(buildApiString('votes/add'), {
				title: voteTitle,
			}, { headers: { Authorization: `Bearer ${accessToken}` } });
		} catch (err) {
			console.log('addVote', err);

			setError('Failed to add vote: ' + err.message);
		}
	};

	return (
		<Modal show={show} onHide={handleHide}>
			<Modal.Header closeButton>
            	<Modal.Title>Add Vote</Modal.Title>
        	</Modal.Header>

			<ErrorMessage error={error} className='pt-3' />

			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Control type='text' value={voteTitle}
							placeholder='Should placeholders be forbidden?'
							onChange={handleTitleChange}
						/>

						<Form.Text className='text-muted'>
							Your vote title should be as clear, concise and neutral as possible
						</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Check disabled custom type='checkbox'>
							<Form.Check.Label>
								I agree to the <a href='/tos'>Terms and Conditions</a>
							</Form.Check.Label>
						</Form.Check>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant='outline-secondary' onClick={handleHide}>
					Close
				</Button>
				<Button variant='primary' onClick={handleAddVote}>
					Add Vote
				</Button>
        	</Modal.Footer>
		</Modal>
	);
};

export default AddVote;
