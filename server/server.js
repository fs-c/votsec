require('dotenv').config();

const inDev = process.env.NODE_ENV !== 'production';

const _ = require('koa-route');
const app = new (require('koa'))();

const { MongoClient } = require('mongodb');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const config = require('./.config');

const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
    + config.mongoDb.connectString;
const client = new MongoClient(uri, { useNewUrlParser: true });

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
        await oktaJwtVerifier.verifyAccessToken(match[1])
    } catch (err) {
        ctx.throw(401, 'Unauthorized');
    }

    await next();
};

let debug = () => { };
if (inDev) {
    app.use(require('@koa/cors')());
    app.use(require('koa-logger')());

    const dbg = require('debug');
    debug = dbg('servierer');
    dbg.enable('servierer');
}

app.use(async (ctx, next) => {
    ctx.state.votes = client.db('votsec').collection('votes');

    await next();
});

app.use(_.get('/', async (ctx, next) => {
    ctx.type = 'application/json';
    ctx.body = { message: 'Hello there' };

    await next();
}));

app.use(_.get('/secure', authenticationRequired, async (ctx, next) => {
    ctx.type = 'application/json';
    ctx.body = { message: 'This is a secured endpoint' };

    await next();
}));

client.connect((err) => {
    debug('connected to mongodb client');

    const { port } = config.resourceServer;
    app.listen(port, () => {
        debug('server listening on port %o', port);
    });
});
