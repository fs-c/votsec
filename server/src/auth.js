const config = require('../../config');

const { log, inProd } = require('./server');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const verifier = new OktaJwtVerifier({
	clientId: config.openID.client,
	issuer: config.openID.issuer,
	assertClaims: config.resourceServer.assertClaims,
});

const { UserError } = require('./error');

const extractToken = (headers) => {
	const match = (headers.authorization || '').match(/Bearer (.+)/);

	if (!match || !match[1]) {
		throw new UserError('Malformed or missing authentication header', 400);
	}

	return match[1];
};

const verifyGroups = async (token, groups) => {
	const claimGroups = token.claims.grp.map((grp) => grp.toLowerCase());

	if (groups) {
		if (!claimGroups) {
			throw new UserError('Groups required but not found', 403);
		}

		for (const group of groups) {
			if (!claimGroups.includes(group.toLowerCase())) {
				throw new UserError('Insufficient permissions', 403);
			}
		}
	}
};

const requireAuth = exports.requireAuth = (requiredGroups) => {
	return async (request, reply) => {
		const rawToken = extractToken(request.headers);
		const token = await verifier.verifyAccessToken(rawToken)

		if (requiredGroups) {
			await verifyGroups(token, requiredGroups);
		}

		request.userId = token.claims.uid;

		if (!inProd) {
			request.token = token;
			request.rawToken = rawToken;
		}
	};
};
