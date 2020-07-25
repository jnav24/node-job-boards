const mongoose = require('mongoose');

const PostingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' }
});

PostingsSchema.methods.insert = function (err) {
    return mongoose.model('Postings').create({
        _id: mongoose.Types.ObjectId(),
        company: this.company,
        description: this.description,
        title: this.title,
    });
};

module.exports = mongoose.model('Postings', PostingsSchema);
