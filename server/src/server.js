require('dotenv').config();

const inDev = process.env.NODE_ENV !== 'production';

const config = require('../../config.js');
exports.config = config;

const _ = require('koa-route');
const app = new (require('koa'))();
const router = new (require('koa-router'))();

const debug = require('debug')('server');

const { authRequired } = require('./auth');
const { connect, votes } = require('./database');

if (inDev) {
    app.use(require('@koa/cors')());
    app.use(require('koa-logger')());
}

router.use(require('koa-bodyparser')());

router.use(async (ctx, next) => {
	ctx.type = 'application/json';

	try {
		await next();
	} catch (err) {
		debug(err, 'catched error');

		ctx.status = err.statusCode || err.status || 500;

		if (inDev) {
			ctx.body = { err };
		}
	}
});

router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hello there' };

    await next();
});

router.get('/secure', authRequired(), async (ctx, next) => {
	ctx.body = { message: 'This is a secured endpoint',
        token: ctx.state.token };

    await next();
});

router.get('/votes/get', async (ctx, next) => {
	const fetched = await votes.get();

	ctx.body = fetched;

	await next();
});

router.post('/votes/add', authRequired('Admin'), async (ctx, next) => {
	debug(ctx.request.body, 'adding a vote');

	ctx.body = await votes.add(ctx.request.body);

	ctx.status = 200;
});

(async () => {

try {
	await connect();
} catch (err) {
	console.error('failed connecting to the database: ', err.message);
	debug(err);

	return;
}

app.use(router.routes());
app.use(router.allowedMethods());

const prefix = process.env.PREFIX || false;
if (prefix) {
	router.prefix(prefix);
}

const port = process.env.PORT || config.resourceServer.port || 8000;
app.listen(port, () => {
	debug('server listening on port %o', port);
});

})();
