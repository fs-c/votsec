const config = require('../../config');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const verifier = new OktaJwtVerifier({
	clientId: config.openID.client,
	issuer: config.openID.issuer,
	assertClaims: config.resourceServer.assertClaims,
});

class AuthError extends Error {
	constructor(message, status = 'badRequest') {
		super(message);

		this.status = status;
	}
}

const getAccessToken = exports.getAccessToken = (headers) => {
	const match = (headers.authorization || '').match(/Bearer (.+)/);

	if (!match || !match[1]) {
		throw new AuthError('Malformed or missing authentication header');
	}

	return match[1];
};

const verifyAuth = exports.verifyAuth = async (accessToken, group) => {
	const token = await verifier.verifyAccessToken(accessToken);
	const groups = token.claims.grp;

	if (group) {
		if (!groups) {
			throw new AuthError('Groups required but not found');
		}

		if (!groups.includes(group)) {
			throw new AuthError('Insufficient permissions', 'forbidden');
		}
	}
};

const requireAuth = exports.requireAuth = (fastify, requiredGroup) => {
	return async (request, reply) => {
		try {
			const token = getAccessToken(request.headers);
			await verifyAuth(token, requiredGroup);

			request.userId = token.claims.id;
		} catch (err) {
			fastify.log.trace(err);
			const status = err.status || 'forbidden';

			reply[status](err.message);
		}

		return;
	};
};
