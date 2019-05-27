const mongoose = require('mongoose');

const config = require('../../../config.js');

const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
	+ config.resourceServer.mongoDB.connectString;

exports.connect = mongoose.connect.bind(this, uri, { useNewUrlParser: true });

exports.votes = require('./votes')
