require('dotenv').config();

const inDev = process.env.NODE_ENV !== 'production';

const _ = require('koa-route');
const app = new (require('koa'))();

const debug = require('debug')('server');

const OktaJwtVerifier = require('@okta/jwt-verifier');

const config = require('./.config');
const { connect, votes } = require('./database/database');

const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: config.resourceServer.oidc.clientId,
    issuer: config.resourceServer.oidc.issuer,
    assertClaims: config.resourceServer.assertClaims,
    testing: config.resourceServer.oidc.testing
});

const authenticationRequired = async (ctx, next) => {
    const authHeader = ctx.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        ctx.throw(401, 'Unauthorized');
    }

    try {
        ctx.state.token = await oktaJwtVerifier.verifyAccessToken(match[1])
    } catch (err) {
        ctx.throw(401, 'Unauthorized');
    }

    await next();
};

if (inDev) {
    app.use(require('@koa/cors')());
    app.use(require('koa-logger')());
}

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
	ctx.type = 'application/json';

	try {
		await next();
	} catch (err) {
		ctx.status = ctx.status || 500;

		if (inDev) {
			ctx.body = err;
		}
	}
});

app.use(_.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hello there' };

    await next();
}));

app.use(_.get('/secure', authenticationRequired));
app.use(_.get('/secure', async (ctx, next) => {
    ctx.body = { message: 'This is a secured endpoint',
        token: ctx.state.token };

    await next();
}));

app.use(_.get('/votes/get', async (ctx, next) => {
	const fetched = await votes.get();

	ctx.body = fetched;

	await next();
}));

app.use(_.post('/votes/add', authenticationRequired));
app.use(_.post('/votes/add', async (ctx, next) => {
	try {
		const status = await votes.add(ctx.request.body);
	} catch (err) {
		debug(err);
	}

	ctx.status = 200;
	ctx.body = status;
}));

(async () => {

await connect();

const { port } = config.resourceServer;
app.listen(port, () => {
	debug('server listening on port %o', port);
});

})();
