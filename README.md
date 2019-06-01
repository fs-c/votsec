### `votsec`

- `app/`: react frontend 
- `server/`: resource server


```
$ git clone https://github.com/LW2904/votsec.git
```

### Requirements

- [NodeJS](https://nodejs.org/en/) >= 8.9, preferably the latest LTS
- A running [MongoDB](https://www.mongodb.com/what-is-mongodb) server (the example uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- An active [Okta](https://developer.okta.com/) Application (requires a free developer account)

Optionally [git](https://git-scm.com/) to clone the repository to your computer.

### Setup

For detailed setup instructions refer to `SETUP.md`. If all this feels familiar to you, feel free to skip right to the Configuration section.

### Configuration

```
$ cp config.example.js config.js
```

The main configuration takes place in `config.js`, which is used by both the frontend and server. Since it's JS you can put just about anything in there, but it must export an `Object` with the following _required_ fields.

```js
const openID = {
	client: '<Public identifier for the Okta client that is required for all OAuth flows>',
	issuer: '<Okta Org URL>/oauth2/default',
	redirect: 'http://localhost:8080/implicit/callback',
	scope: 'openid profile email groups',
};

const resourceServer = {
	port: 8090, // Port the resource server should listen on, defaults to 8090
	url: 'http://localhost',
	mongoDB: {
		connectString: '<URI to your running MongoDB instance>',
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

```

Additionally, the resource server requires you to pass the `MONGODB_NAME` and `MONGODB_PASSWORD` environment variables. (I personally recommend using a `.env` file in `server/`)
