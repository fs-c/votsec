const debug = require('debug')('auth');
const { config } = require('./server');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const authRequired = exports.authRequired = (requiredGroup) => {
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