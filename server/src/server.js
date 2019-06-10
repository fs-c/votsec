require('dotenv').config();
const config = require('../../config');

const fastify = require('fastify')({ logger: 'trace' });

fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-cors'), {
	// TODO: Actually implement CORS
	origin: true,
});

fastify.register(require('./database').connector);

const prefix = process.env.PREFIX || '/';
fastify.register(require('./routes'), { prefix });

const port = process.env.PORT || config.resourceServer.port || 8000;

fastify.listen(port, (err, address) => {
	if (err) {
		fastify.log.trace(err);
		fastify.log.fatal('Failed to listen on port %o: %o', port, err.message);

		process.exit(1);
	}
});
