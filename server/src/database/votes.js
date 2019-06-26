const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    title: { type: String, index: { unique: true } },
    for: { type: Number, default: 0 },
    against: { type: Number, default: 0 },
    creationDate: { type: Date, default: () => new Date(Date.now()) },
    startDate: { type: Date, default: () => new Date(Date.now()) },
    endDate: { type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
});

const Vote = exports.Vote = mongoose.model('Vote', VoteSchema);

const addVote = exports.add = async (vote) => {
	return await new Vote(vote).save();
};

const getVotes = exports.get = async (conditions, options) => {
	const opt = Object.assign({
		skip: 0,
		limit: undefined,
	}, options);

	return await Vote.find(conditions, null, opt).sort('-startDate');
};

const deleteVote = exports.delete = async (id) => {
	return await Vote.deleteOne({ _id: id });
};
