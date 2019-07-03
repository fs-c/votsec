const CustomError = exports.CustomError = class extends Error {
	constructor({ userMessage, message, status = 500 }) {
		super(message);

		this.status = status;
		this.userMessage = userMessage;
	}
}

const UserError = exports.UserError = class extends CustomError {
	constructor(userMessage, status = 500) {
		super({ userMessage, status, message: 'User error' });
	}
}

const errorHandler = exports.errorHandler = (err, request, reply) => {
	request.log.trace({
		message: err.message,
		stack: err.stack,
	}, err.message);

	console.log('entered the errorHandler');

	reply.code(err.status || 404).send({
		success: false,
		message: err.userMessage || 'Something went wrong',
	});
};
