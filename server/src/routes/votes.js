const { requireAuth } = require('../auth');

module.exports = (fastify, opts, next) => {
	fastify.get('/get', async (request, reply) => {
		return await fastify.database.votes.get() || [];
	});

	fastify.post('/add', {
		preHandler: requireAuth(fastify, 'Admin'),
	}, async (request, reply) => {
		try {
			return await fastify.database.votes.add(request.body); 
		} catch (err) {
			reply.badRequest(err.message);
		}
	});

	fastify.delete('/delete/:id', {
		preHandler: requireAuth(fastify, 'Admin'),
	}, async (request, reply) => {
		fastify.log.info('params: %o', request.params);

		try {
			return await fastify.database.votes.delete(request.params.id);
		} catch (err) {
			reply.badRequest(err.message);
		}
	});

	next();
};
