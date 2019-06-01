Requirements for following the steps required to set up `votsec`:

- [NodeJS](https://nodejs.org/en/) >= 8.9, preferably the latest LTS
- [Git](https://git-scm.com/) and (on Windows) the accompanying Git Bash

On Windows, the term 'Terminal' will refer to Git Bash, on other operating systems it is your default Terminal (assuming it uses Bash).

0. __Clone the repository__

This step is not necessarily required and you could also use GitHub's 'Download ZIP' feature to fetch the project code. Since most of the following setup will be performed from the command line anyways, I feel like cloning is the more natural option.

```bash
# Replace with the path to the folder where you want the code to be in
$ cd Projects/
$ git clone https://github.com/LW2904/votsec.git
```

All done! For the following steps, you might want to move into the new directory using

```bash
$ cd votsec/
```

and create an empty config file

```
$ cp config.example.js config.js
```

1. __Setup the database__

Any MongoDB (version 4.0 preferred) instance will do, but the following will outline the creation of a free MongoDB Atlas instance.

Sign up for a free [MongoDB Atlas](https://www.mongodb.com/download-center/cloud) account, and follow the instructions to create a cluster. The free tier will only allow you to customise the region and name of your to-be cluster, both of which are up to you.

After your DB instance has spun up,

- In the Clusters tab, select your cluster and navigate to the Collections tab. Create a database called `votsec` with a collection `votes`.
- Add a new user in the Database Access tab. It will need read and write access to the `votsec` database, although for now it'll do to give it said access to all databases.
- Allow access from all IPs by going to the Network Access tab and choosing 'Allow access from anywhere'. __This is only for development__, make sure to narrow it down to the IP(s) of your server(s) once you're up and running.

Once you're all set, fetch your connection string by clicking the 'Connect' button of your cluster in the Clusters tab, and choosing 'Connect Your Application' (at the time of writing, the default values of 'Node.js' and 'version 3.0 or later' are appropiate). You'll want to insert said string into `config.js` under `resourceServer.mongoDB.connectionString`.

_The above notation corresponds to the dot notation for accessing an object's properties as it exists be done in JS. The following example should help to illustrate the meaning._

```js
// config.js

const resourceServer = {
	// ...
	mongoDB: {
		connectionString: `this is the value you're looking to replace`,
	},
	// ...
};

// ...
```

You can also already create a file called `.env` in `server/` and insert the credentials of the database user you just created, using the following format.

```bash
MONGODB_NAME=...
MONGODB_PASSWORD=...
```

This file will get picked up once the server starts and set the given [environment variables](https://en.wikipedia.org/wiki/Environment_variable). Both of them are required for the server to establish a connection to the MongoDB database, but the way through which you provide them is left up to you; I simple feel like `.env` files are the most convenient way.

2. __Setup your Okta application__

_Since there's a good chance that `votsec` will switch to either a different, or an in-house authentication provider in the near future, the following section only outlines the very basics. Much more configuration could be done in Okta, but since this is a prototype the rather barebones configuration, while certainly lacking a lot of polish, will do for now._

Head over the the Okta developer [signup page](https://developer.okta.com/signup/) and complete the registration (you'll receive an activation email containing a temporary password which you can use to complete the process).

Once you're in the Developer Console,

- Create a group called 'Admin', by choosing the Groups item in the Users dropdown. Add your user to it by clicking on the new group, and selecting 'Manage People'.
- Fetch your Issuer URI from the default Authorization Server, by choosing the item of the same name in the API dropdown, and insert it into `openID.issuer` in `config.js`.
- Now add a 'groups' claim to all ID tokens by selecting the default server, navigating to the Claims tab and selecting the 'Add Claim' button. The claim name should be 'groups' and it should always be included in ID Tokens. It should have a value of type Groups and as a filter it should have the [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) `.*` (this is a regex that matches everything, and will include all groups; you might want to narrow this down to only the groups that are actually required and used by `votsec`).
- Finally, create your application by choosing 'Add Application' and 'Single Page App' in the Applications menu. The default configuration is fine for development (although you might want to change the name), but __you will have to__ add the relevant URI(s) to the Base and Login redirect URIs once you go live.

Now that your application is created, you'll want to switch from the Developer Console to the Classic UI via the selector in the top left. Some features are provided while others are missing in the other and vice versa, so you will probably find yourself switching quite frequently in the future.

Once you're in the Classic UI,

- Fetch the last two required `config.js` values, `openID.client` and `openID.redirect` from the Applications menu, by selecting your application and navigating to the General tab.
- Allow all groups to be passed through the ID token by navigating to the Sign On tab of the same page and selecting 'Edit' in the 'OpenID Connect ID Token' section. You'll want to set the Groups claim filter to 'Matches regex', with the already familiar `.*` expression.

3. __Setup the frontend and backend__

Please refer to the READMEs found in the `app/` and `server/` directories for instructions and information.
