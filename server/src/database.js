/* Interface between customisable database logic in ./database/ and
 * consumers
 */

const fastifyPlugin = require('fastify-plugin');

const votes = require('./database/votes');
const { connect } = require('./database/connect');

exports.votes = votes;

exports.connector = fastifyPlugin(async (fastify, opts) => {
	await connect(opts);

	fastify.log.info('Connected to database');

	fastify.decorate('database', { votes });
});