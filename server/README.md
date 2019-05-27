### `votsec/server`

```
$ cd server
$ npm i
$ node src/server.js
```

Simplistic resource server acting as an intermediary between frontend and database, authenticating requests. The database related code (located in `src/database/`) is intentially written in a way that allows for easy interchanging of database services.

Debug logging can be enabled by ensuring that the environment variable `NODE_ENV !== 'production'` and by passing the `DEBUG=server,database` env var.
