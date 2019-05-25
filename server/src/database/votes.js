const mongoose = require('mongoose');

const debug = require('debug')('database:votes');

const VoteSchema = new mongoose.Schema({
    title: { type: String },
    for: { type: Number, default: 0 },
    against: { type: Number, default: 0 },
    description: { type: String },
    creationDate: { type: Date, default: () => new Date(Date.now()) },
    startDate: { type: Date, default: () => new Date(Date.now()) },
    endDate: { type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
    hidden: { type: Boolean , default: false },
});

const Vote = exports.Vote = mongoose.model('Vote', VoteSchema);

const addVote = exports.add = async (v) => {
	const status = { saved: [], failed: [] };
	const votes = typeof v === 'Array' ? v : [ v ];

	debug('adding %o votes', votes.length);

	for (const vote of votes) {
		try {
			await new Vote(vote).save();

			debug('added vote %o', vote);

			status.saved.push(vote);
		} catch (err) {
			debug('failed adding vote %o: %o', vote, err);

			status.failed.push({ vote, err });
		}
	}

	return status;
};

const getVotes = exports.get = async () => {
	debug('getting votes');

	const votes = await Vote.find();

	debug('found %o votes', votes.length);

	return votes;
}
