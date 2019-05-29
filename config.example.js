const openID = {
	client: '',
	issuer: '',
	redirect: '',
	scope: 'openid profile email groups',
};

const resourceServer = {
	port: 8090,
	url: 'http://localhost',
	mongoDB: {
		connectString: '',
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