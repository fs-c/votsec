const { inProd } = require('./server');

module.exports = (fastify, opts, next) => {
	const routes = [];

	fastify.addHook('onRoute', (route) => routes.push({
		method: route.method,
		path: route.path,
	}));

	fastify.get('/', async (request, reply) => {
		return { message: 'Did you get lost?', routes };
	});

	fastify.register(require('./routes/votes'), { prefix: '/votes' });

	if (!inProd) {
		fastify.register(require('./routes/hello'), { prefix: '/hello' });
	}

	next();
};
