const Companies = require('./models/companies');
const Jobs = require('./models/postings');

const Query = {
    company: async (root, args) => await Companies.findById(args.id).exec(),
    job: async (root, args) => await Jobs.findById(args.id).exec(),
    jobs: async () => await Jobs.find().exec(),
};

const Job = {
    company: async job => await Companies.findById(job.company).exec(),
};

module.exports = {
    Query,
    Job,
};
