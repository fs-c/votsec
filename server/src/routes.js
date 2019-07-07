const { inProd } = require('./server');
const { UserError } = require('./error');

module.exports = async (fastify, opts) => {
	fastify.get('/', {
		'2xx': {
			type: 'object',
			properties: { message: { type: 'string' } },
		},
	}, async (req, res) => {
		return { message: 'Did you get lost?' };
	});

	fastify.register(require('./routes/votes'), { prefix: 'votes' });

	if (!inProd) {
		fastify.register(require('./routes/test'), { prefix: 'test' });
	}
};
