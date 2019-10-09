const mongoose = require('mongoose');

const CompaniesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
});

module.exports = mongoose.model('Companies', CompaniesSchema);
