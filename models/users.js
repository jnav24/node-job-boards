const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' }
});

module.exports = mongoose.model('Users', UsersSchema);
