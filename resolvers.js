const Jobs = require('./models/postings');

const Query = {
    jobs: async () => await Jobs.find().exec(),
};

module.exports = {
    Query,
};
