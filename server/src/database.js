/* Interface between customisable database logic in ./database/ and
   consumers */

const mongoose = require('mongoose');

const config = require('../../config.js');

const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
	+ config.resourceServer.mongoDB.connectString;

exports.connect = mongoose.connect.bind(this, uri, { useNewUrlParser: true });

/**
 * Votes is required to implement and export
 * 		- addVote(vote || vote[])
 * 		- getVotes()
 */
exports.votes = require('./database/votes')
