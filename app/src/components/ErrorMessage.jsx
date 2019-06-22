import React from 'react';

import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ prefix = '', error }) => {
	return (
		<div className='row justify-content-center align-items-center'>
			<Alert show={error !== null} variant='danger'
				className='md-auto'
			>
				{prefix + error}
			</Alert>
		</div>
	);
};

export default ErrorMessage;
