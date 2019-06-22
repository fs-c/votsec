import React from 'react';

import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ error }) => {
	return (
		<div className='row justify-content-center align-items-center'>
			<Alert show={error !== null} variant='danger'
				className='md-auto'
			>
				Failed to load votes: {error}
			</Alert>
		</div>
	);
};

export default ErrorMessage;
