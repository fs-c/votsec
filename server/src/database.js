/* Interface between customisable database logic in ./database/ and
 * consumers
 */

const config = require('../../config.js');

const dbConfig = config.resourceServer.mongoDB;

/* Connect is required to export a single async function which returns once
 * a connection was established/once the DB provider is ready.
 */
const connect = require('./database/connect')
	.connect.bind(this, dbConfig);

/* Votes is required to implement the async functions
 * 		- add(vote)
 *		- delete(id)
 *		- get([options])
 *		- for(voteId, userId)
 *		- against(voteId, userId)
 */
const votes = require('./database/votes');

const fastifyPlugin = require('fastify-plugin');

exports.connector = fastifyPlugin(async (fastify) => {
	await connect();

	fastify.log.info('Connected to database');

	fastify.decorate('database', { votes });
});
