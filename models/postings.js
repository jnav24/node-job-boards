const mongoose = require('mongoose');

const PostingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' }
});

module.exports = mongoose.model('Postings', PostingsSchema);
