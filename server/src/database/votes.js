const mongoose = require('mongoose');

const { debug } = require('../server');

const VoteSchema = new mongoose.Schema({
    title: String,
    for: Number,
    against: Number,
    description: String,
    creationDate: Date,
    startDate: Date,
    endDate: Date,
    hidden: Boolean,
});

const Vote = exports.Vote = mongoose.model('Vote', VoteSchema);

const addVote = exports.add = async (v) => {
	const status = { saved: [], failed: [] };
	const votes = typeof v === 'Array' ? v : [ v ];

	for (const vote of votes) {
		vote.creationDate = vote.creationDate || new Date(Date.now());

		try {
			await new Vote(vote).save();

			debug('saved vote');

			status.saved.push(vote);
		} catch (err) {
			debug('failed saving vote', err);

			status.failed.push({ vote, err });
		}
	}

	return status;
};

const getVotes = exports.get = async () => {
    return await Vote.find();
}
