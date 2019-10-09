const mongoose = require('mongoose');

const PostingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    companyId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Postings', PostingsSchema);
