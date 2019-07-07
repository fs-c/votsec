require('dotenv').config();
const config = require('../../config');

const inProd = exports.inProd = process.env.NODE_ENV === 'production';

const log = exports.log = require('pino')(inProd ? {
	level: 'info',
} : {
	level: 'trace',
	prettyPrint: { colorize: true, translateTime: true },
	redact: {
		paths: [
			'req.hostname',
			'req.remoteAddress',
			'req.remotePort',
		], remove: true,
	}
});

const fastify = require('fastify')({ 
	logger: log,
});

fastify.register(require('fastify-sensible'), { errorHandler: false });
fastify.register(require('fastify-cors'), {
	// TODO: Actually implement CORS
	origin: true,
});

fastify.register(require('./database').connector,
	config.resourceServer.mongoDB);

fastify.setErrorHandler(async (err, req, res) => {
	req.log.debug(err);

	const message = err.userMessage || err.validation && 'Validation failed'
		|| 'Something unexpected happened';
	const code = (err.statusCode && err.statusCode >= 400) ? err.statusCode : 500;

	res.code(code).send({ success: false, message });
});

fastify.setNotFoundHandler(async (req, res) => {
	res.code(404).send({ success: false, message: 'Not Found' });
});

const prefix = process.env.PREFIX || config.resourceServer.prefix || '';
fastify.register(require('./routes'), { prefix });

const port = process.env.PORT || config.resourceServer.port || 8000;
fastify.listen(port, (err) => {
	if (err) {
		fastify.log.trace(err);
		fastify.log.fatal('Failed to listen on port %o: %o', port, err.message);

		process.exit(1);
	}
});
