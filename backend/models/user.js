const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    mail: {type: String, unique: true},
    userName: {type: String},
    password: {type: String},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('User', userSchema);