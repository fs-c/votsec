const openID = {
	client: '0oam89tv5H5LBTiw0356',
	issuer: 'https://dev-789978.okta.com/oauth2/default',
	redirect: 'http://localhost:8080/implicit/callback',
	scope: 'openid profile email groups',
};

const resourceServer = {
	port: 8090,
	url: 'http://localhost',
	mongoDB: {
		connectString: 'votsec-cluster-qlzxh.mongodb.net/votsec?retryWrites=true',
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