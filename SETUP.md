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

Create a free MongoDB Atlas account [here](https://www.mongodb.com/download-center/cloud), and follow the instructions to create a cluster. The free tier will only allows you to customise the region and name of your to-be cluster, both of which are up to you.

After your DB instance has spun up,

- `Your Cluster` > Collections > Add my own data. You'll want to create a database called `votsec` with a collection `votes`.
- Database Access (in the sidebar) > Add new user. The new user will need read and write access to the `votsec` database.
- Network Access (in the sidebar) > Add IP address. I'd recommend you start off with allowing access from anywhere, but make sure you narrow it down to only your server(s) once you're up and running.

Once you're all set, fetch your connection string from `Your Cluster` > Connect > Connect Your Application > Select NodeJS and 3.0 or later, and insert it into `resourceServer.mongoDB.connectionString` in `config.js`.

You can also already create a file called `.env` in `server/` and insert the credentials of the database user you just created, using the following format.

```bash
MONGODB_NAME=...
MONGODB_PASSWORD=...
```

This file will get picked up once the server starts and set the `MONGODB_NAME` and `MONGODB_PASSWORD` environment variables. Optionally, if you'd rather not save this critical data to disk or if you want to override them on startup, you can also pass either or both of them through the command line.

2. __Setup your Okta application__

_Since there's a good chance that `votsec` will switch to either a different, or an in-house authentication provider in the near future, the following section only outlines the very basics._

Head over the the Okta developer [signup page](https://developer.okta.com/signup/) and complete the registration (you'll receive an activation email containing a temporary password which you can use to complete the process).

Once you're in the Developer Console,

- Users > Groups > Add Group, name it 'Admin', and add your user to it.
- API > Authorization Servers, fetch your Issuer URI and insert it in to `openID.issuer` in `config.js`.
- API > Authorization Servers > default > Claims > Add Claim. The claim name should be 'groups' and it should always be included in ID Tokens. It should have a value of type Groups and as a filter it should have a regex that matches everything, `.*`.
- Applications > Add Application > Single-Page-App, the default configuration is fine for development, you'll want to add your server to the Base and Login redirect URIs once you go live.

Now that your application is created, you'll want to switch from the Developer Console to the Classic UI via the selector in the top left. Once you're in the Classic UI,

- Applications > `Your Application`
	- from the General tab, get your redirect URI and Client ID and and insert them into into `openID.client` and `openID.redirect` respectively in `config.js`.
	- in the Sign On tab, navigate to OpenID Connect ID Token and select Edit. Set the groups claim filter to 'Matches regex' and insert `.*`.

3. __Setup the backend__

```bash
$ cd server/
# Install dependencies
$ npm install
# Run the server
$ node src/server.js

# Optionally, to run in debugging move, do
$ DEBUG=server,database:* node src/server.js
# to enable debug logging for the server and all database related modules
```

Open a new terminal after you started the server.

4. __Setup the frontend__

```
$ cd app/
$ npm install
```

Now, while the process for getting the backend running does not differ _too much_ between development and production, it very much does for the frontend.

In essence, the frontend consists of a number of _static files_ which need to be built, like so

```bash
# Build the production files into build/
$ npm run build
```

You could now host the files in the `build/` directory using a regular Web server (like nginx), but for simplicitiy's sake this won't be outlined in more detail here. 

In order to cover the most basic use case, starting a developemnt server, simply do

```bash
# Start the dev-server
$ npm run start
# ...or alternatively
$ npm start
```
