const mongoose = require('mongoose');

const config = require('../.config');

const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
	+ config.mongoDb.connectString;

exports.connect = mongoose.connect.bind(this, uri, { useNewUrlParser: true });

exports.votes = require('./votes')
