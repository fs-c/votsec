import React from 'react';

import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ error, prefix = '', className = '' }) => {
	if (error === null)
		return <></>;

	return (
		<div className={`${className} row justify-content-center align-items-center`}>
			<Alert show={true} variant='danger'
				className='md-auto'
			>
				{prefix + error}
			</Alert>
		</div>
	);
};

export default ErrorMessage;
