const mongoose = require('mongoose');

const Vote = exports.Vote = mongoose.model('Vote', new mongoose.Schema({
    title: String,
    for: Number,
    against: Number,
    description: String,
    creationDate: Date,
    startDate: Date,
    endDate: Date,
    hidden: Boolean,
}));