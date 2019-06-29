import React, { useState, useContext } from 'react';

import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ErrorMessage from '../ErrorMessage';

import { UserContext } from '../app/App';
import { buildApiString, formatVoteTimes, formatServerError } from '../../helpers';

const DetailedVote = ({ show, handleHide, voteId, title, startDate, endDate }) => {
	const { accessToken } = useContext(UserContext);

	const [ error, setError ] = useState(null);

	const submitVote = async ({ target }) => {	
		const voteFor = target.id === 'vote-yes';

		try {
			const query = { for: voteFor };
			await axios.post(buildApiString(`votes/vote/${voteId}`, query), {}, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
		} catch (err) {
			console.error('submitVote', err);

			setError(formatServerError(err));
		}
	};

	return (
		<Modal show={show} onHide={handleHide}>
			<Modal.Header closeButton>
				<small className='text-muted'>
					{formatVoteTimes(startDate, endDate)}
				</small>
        	</Modal.Header>

			<ErrorMessage error={error} className='pt-3' />

			<Modal.Body>
				<h5 className='mb-3'>{title}</h5>

				<Row>
					<Col>
						<Button className='w-100' variant='outline-success'
							onClick={submitVote} id='vote-yes'
						>
							Yay
						</Button>
					</Col>

					<Col>
						<Button className='w-100' variant='outline-danger'
							onClick={submitVote} id='vote-no'
						>
							Nay
						</Button>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
};

export default DetailedVote;
