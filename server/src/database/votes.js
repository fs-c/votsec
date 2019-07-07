const mongoose = require('mongoose');

// The actual input validation should occur before this, but some sane limits 
// are still enforced here.
const VoteSchema = new mongoose.Schema({
    title: { type: String, index: { unique: true }, minlength: 1 },
    for: { type: Number, default: 0, min: 0},
    against: { type: Number, default: 0, min: 0 },
    creationDate: { type: Date, default: () => new Date(Date.now()) },
    startDate: { type: Date, default: () => new Date(Date.now()) },
	endDate: { type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
	voters: [ String ],
});

const Vote = mongoose.model('Vote', VoteSchema);

/**
 * @param {object} conditions - passed directly to the driver
 * @param {object} options - passed directly to the driver
 * 
 * @returns {Promise<Vote[]>}
 */
const get = exports.get = (conditions, options) => {
	return Vote.find(conditions, null, options).sort('-startDate');
};

/**
 * @param {Vote} vote - the vote to be added
 * 
 * @returns {Promise<Vote>}
 */
const add = exports.add = (vote) => {
	return new Vote(vote).save();
};
