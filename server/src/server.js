require('dotenv').config();

const inDev = process.env.NODE_ENV !== 'production';

const _ = require('koa-route');
const app = new (require('koa'))();

const OktaJwtVerifier = require('@okta/jwt-verifier');

const config = require('../.config');
const { connect } = require('./database/database');

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

        debug(ctx.state.token);
    } catch (err) {
        ctx.throw(401, 'Unauthorized');
    }

    await next();
};

let debug = () => {};
if (inDev) {
    app.use(require('@koa/cors')());
    app.use(require('koa-logger')());

    const dbg = require('debug');
    debug = dbg('votsec-server');
    dbg.enable('votsec-server');
}

exports.debug = debug;

app.use(_.get('/', async (ctx, next) => {
    ctx.type = 'application/json';
    ctx.body = { message: 'Hello there' };

    await next();
}));

app.use(_.get('/secure', authenticationRequired));
app.use(_.get('/secure', async (ctx, next) => {
    ctx.type = 'application/json';
    ctx.body = { message: 'This is a secured endpoint',
        token: ctx.state.token };

    await next();
}));

connect((err) => {
    debug('connected to mongodb client');

    const { port } = config.resourceServer;
    app.listen(port, () => {
        debug('server listening on port %o', port);
    });
});
