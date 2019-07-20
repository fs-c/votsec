const { UserError } = require('../error');
const { requireAuth } = require('../auth');

module.exports = async (fastify, opts) => {
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

	fastify.get('/auth', {
		preHandler: requireAuth(),
	}, async (req, res) => {
		return {
			message: 'Congratulations, you are authenticated',
			user: req.user,
		};
	});

	fastify.get('/auth/admin', {
		preHandler: requireAuth([ 'admin' ]),
	}, async (req, res) => {
		return {
			message: 'Congratulations, you are an administrator',
			user: req.user,
		};
	});
};
