import React, { useState, useContext } from 'react';

import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ErrorMessage from '../ErrorMessage';

import { UserContext } from '../app/App';
import { buildApiString, formatVoteTimes } from '../../helpers';

const DetailedVote = ({ show, handleHide, title, startDate, endDate }) => {
	const { accessToken } = useContext(UserContext);

	const [ error, setError ] = useState(null);

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
						<Button className='w-100'>Yay</Button>
					</Col>

					<Col>
						<Button className='w-100'>Nay</Button>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
};

export default DetailedVote;
