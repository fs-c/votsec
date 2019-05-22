const mongoose = require('mongoose');

const { Vote } = require('./models');
const { debug } = require('../server');
const config = require('../.config');

const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
    + config.mongoDb.connectString;

exports.connect = mongoose.connect.bind(this, uri, { useNewUrlParser: true });

const addVote = exports.addVote = async (vote) => {
    vote.creationDate = vote.creationDate || new Date(Date.now());

    await new Vote(vote).save();
};

const getVotes = exports.getVotes = async () => {
    return await Vote.find();
}
