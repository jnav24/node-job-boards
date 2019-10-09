const mongoose = require('mongoose');

const PostingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
});

module.exports = mongoose.model('Postings', PostingsSchema);
