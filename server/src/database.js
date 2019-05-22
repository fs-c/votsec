const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const config = require('../.config');

const { MONGODB_NAME, MONGODB_PASSWORD } = process.env;
const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
    + config.mongoDb.connectString;
const client = new MongoClient(uri, { useNewUrlParser: true });
