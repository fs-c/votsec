const openID = {
	client: '<20 (?) alphanumeric characters>',
	issuer: '<issuer URL>',
	redirect: '<URL users will be redirected to after auth>',
	scope: 'openid profile email groups',
};

const resourceServer = {
	port: 8090,
	url: 'http://localhost',
	mongoDB: {
		connectString: 'host[:port]/[database][?options]',
	},
	assertClaims: {
		aud: 'api://default',
		cid: openID.client,
	},
};

module.exports = {
	openID,
	resourceServer,
};