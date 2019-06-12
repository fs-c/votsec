const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    title: { type: String, index: { unique: true } },
    for: { type: Number, default: 0 },
    against: { type: Number, default: 0 },
    description: { type: String },
    creationDate: { type: Date, default: () => new Date(Date.now()) },
    startDate: { type: Date, default: () => new Date(Date.now()) },
    endDate: { type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
    hidden: { type: Boolean , default: false },
});

const Vote = exports.Vote = mongoose.model('Vote', VoteSchema);

const addVote = exports.add = async (vote) => {
	if (Vote.find({ title: vote.title }))
		throw new Error('Duplicate title');

	return await new Vote(vote).save();
};

const getVotes = exports.get = async () => {
	return await Vote.find({ hidden: false });
}

const deleteVote = exports.delete = async (id) => {
	return await Vote.deleteOne({ _id: id });
};
