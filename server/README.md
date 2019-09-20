### `votsec/server`

```bash
$ cd server/
# Install the dependencies
$ npm install
# Run the server
$ node src/server.js
```

In production, you will very likely want to use a process manager like [PM2](http://pm2.keymetrics.io/) to run your scripts as [daemons](https://en.wikipedia.org/wiki/Daemon_(computing)) and to handle automatic restarts and logging.

---

Simplistic resource server acting as an intermediary between frontend and database, authenticating requests. The database related code (located in `src/database/`) is intentially written in a way that allows for easy interchanging of database services.
