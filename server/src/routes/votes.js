module.exports = (fastify, opts, next) => {
	fastify.log.trace(fastify.database);

	fastify.get('/get', async (request, reply) => {
		return await fastify.database.votes.get() || [];
	});

	fastify.post('/add', async (request, reply) => {

	});

	next();
};
