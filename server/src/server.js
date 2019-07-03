require('dotenv').config();
const config = require('../../config');

const inProd = exports.inProd = process.env.NODE_ENV === 'production';

const log = exports.log = require('pino')({
	level: inProd ? 'info' : 'trace',
	prettyPrint: inProd ? false : {
		colorize: true, translateTime: true
	},
	useLevelLabels: !inProd,
	redact: inProd ? undefined : { paths: [
		'reqId',
		'req.hostname',
		'req.remoteAddress',
		'req.remotePort',
	], remove: true },
});

const fastify = require('fastify')({ 
	logger: log,
	disableRequestLogging: !inProd,
});

const { errorHandler } = require('./error');
fastify.setErrorHandler(errorHandler);

fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-cors'), {
	// TODO: Actually implement CORS
	origin: true,
});

const { hooks } = require('./logging')
for (const hook in hooks) {
	fastify.addHook(hook, hooks[hook]);
}

fastify.decorateRequest('userId', '');

fastify.register(require('./database').connector);

const prefix = process.env.PREFIX || config.resourceServer.prefix || '/';
fastify.register(require('./routes'), { prefix });

const port = process.env.PORT || config.resourceServer.port || 8000;

fastify.listen(port, (err, address) => {
	if (err) {
		fastify.log.trace(err);
		fastify.log.fatal('Failed to listen on port %o: %o', port, err.message);

		process.exit(1);
	}
});
