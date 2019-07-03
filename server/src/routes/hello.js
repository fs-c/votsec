const { UserError } = require('../error');
const { requireAuth } = require('../auth');

module.exports = (fastify, opts, next) => {
	fastify.decorateRequest('token', {});
	fastify.decorateRequest('rawToken', '');

	fastify.get('/', async (request, reply) => {
		reply.status(200).send({
			message: 'Hello world',
		});
	});

	fastify.get('/token', {
		preHandler: requireAuth(),
	}, async (request, reply) => {
		reply.status(200).send({
			token: request.token,
			rawToken: request.token,
		});
	});

	fastify.get('/admin', {
		preHandler: requireAuth([ 'admin' ]),
	}, async (request, reply) => {
		reply.status(200).send({
			message: 'Hello admin',
		});
	});

	fastify.get('/error', {
		preHandler: async (request, reply) => {
			throw new UserError('An error occured!', 503);
		},
	}, async (request, reply) => {
		reply.status(200).send({
			message: 'Unexpectedly, no error occured',
		});
	});

	next();
};
