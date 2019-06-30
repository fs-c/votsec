const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    title: { type: String, index: { unique: true } },
    for: { type: Number, default: 0 },
    against: { type: Number, default: 0 },
    creationDate: { type: Date, default: () => new Date(Date.now()) },
    startDate: { type: Date, default: () => new Date(Date.now()) },
	endDate: { type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
	voters: [ String ],
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

const submitVote = async (yes, voteId, userId) => {
	const vote = await Vote.findOne({ _id: voteId });

	if (!vote)
		throw new Error('Invalid vote ID');

	// Legacy support
	if (!vote.voters)
		vote.voters = [];

	if (vote.voters.includes(userId))
		throw new Error('User already voted');

	vote.for += yes ? 1 : -1;
	vote.voters.push(userId);

	await vote.save();

	return {};
};

const voteFor = exports.for = async (voteId, userId) => {
	return await submitVote(true, voteId, userId);
};

const voteAgainst = exports.against = async (voteId, userId) => {
	return await submitVote(false, voteId, userId);
};
