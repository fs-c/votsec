require('dotenv').config();

const inDev = process.env.NODE_ENV !== 'production';

const config = require('../../config.js');
exports.config = config;

const _ = require('koa-route');
const app = new (require('koa'))();
const router = new (require('koa-router'))();

const debug = require('debug')('server');

const OktaJwtVerifier = require('@okta/jwt-verifier');

const { connect, votes } = require('./database/database');

const authRequired = (requiredGroup) => {
	const verifier = new OktaJwtVerifier({
		clientId: config.openID.client,
		issuer: config.openID.issuer,
		assertClaims: config.resourceServer.assertClaims,
	});

	return async (ctx, next) => {
		debug('entering authRequired');

		const authHeader = ctx.headers.authorization || '';
		const match = authHeader.match(/Bearer (.+)/);

		debug('fetched bearer token')

		if (!match || !match[1]) {
			debug(authHeader, 'token not found');
	
			ctx.throw(401, 'No token provided');
		}

		try {
			debug('verifying token');

			ctx.state.token = await verifier.verifyAccessToken(match[1]);

			const { grp } = ctx.state.token.claims;

			if (!grp && requiredGroup) {
				debug('groups are required but no groups field in token');

				ctx.throw(401, 'Token error');
			}

			if (!grp.includes(requiredGroup)) {
				debug('required group %o is not in groups %o', requiredGroup,
					grp);
				
				ctx.throw(401, 'Insufficient permissions');
			}
		} catch (err) {
			ctx.throw(401, 'Unauthorized', err);
		}

		await next();
	};
};

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

const port = process.env.PORT || config.resourceServer.port || 8000;
app.listen(port, () => {
	debug('server listening on port %o', port);
});

})();
