const { inProd } = require('./server');
const { UserError } = require('./error');

module.exports = (fastify, opts, next) => {
	fastify.get('/', async (req, res) => {
		return { message: 'Did you get lost?' };
	});

	fastify.get('/routes', async (req, res) => {
		return fastify.printRoutes();
	});

	fastify.get('/error/route', async (req, res) => {
		throw new UserError('Error inside route', 400);
	});

	fastify.get('/error/middleware', {
		preHandler: async (req, res) => {
			throw new UserError('Error inside `preHandler` hook', 402);
		},
	}, async (req, res) => {
		return { message: 'You should never see this' };
	});

	next();
};