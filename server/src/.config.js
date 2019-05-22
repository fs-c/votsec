module.exports = {
    resourceServer: {
        port: 8000,
        oidc: {
            clientId: '0oam89tv5H5LBTiw0356',
            issuer: "https://dev-789978.okta.com/oauth2/default"
        },
        assertClaims: {
            aud: "api://default",
            cid: '0oam89tv5H5LBTiw0356'
        }
    },
    mongoDb: {
        connectString: 'votsec-cluster-qlzxh.mongodb.net/test?retryWrites=true'
    }
};
