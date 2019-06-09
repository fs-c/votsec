const mongoose = require('mongoose');

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

	for (const vote of votes) {
		try {
			await new Vote(vote).save();

			status.saved.push(vote);
		} catch (err) {
			status.failed.push({ vote, err });
		}
	}

	return status;
};

const getVotes = exports.get = async () => {
	return await Vote.find({ hidden: false });
}