const { httpErrors } = require('./server');

const CustomError = exports.CustomError = class extends Error {
	status = 500;
	userMessage = '';

	constructor(opts) {
		super(opts.message);

		this.status = opts.status;
		this.userMessage = opts.userMessage;
	}
}

const AuthError = exports.AuthError = class extends CustomError {
	constructor(userMessage, status = 400) {
		super({ userMessage, status, message: 'auth error' });
	}
}

const errorHandler = exports.errorHandler = async (err, request, reply) => {
	reply.log.trace(err);

	reply.code(err.status || 404).send({
		success: false,
		message: err.userMessage || 'Something went wrong',
	});
};
