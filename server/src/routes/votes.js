const { requireAuth } = require('../auth');

module.exports = (fastify, opts, next) => {
	fastify.log.trace(fastify.database);

	fastify.get('/get', async (request, reply) => {
		return await fastify.database.votes.get() || [];
	});

	fastify.post('/add', {
		preHandler: requireAuth(fastify, 'Admin'),
	}, async (request, reply) => {
		return await fastify.database.votes.add(request.body);
	});

	next();
};
