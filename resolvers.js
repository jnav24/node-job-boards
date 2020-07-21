const Companies = require('./models/companies');
const Jobs = require('./models/postings');

const Query = {
    jobs: async () => await Jobs.find().exec(),
};

const Job = {
    company: async job => await Companies.findById(job.company).exec(),
};

module.exports = {
    Query,
    Job,
};
