const Companies = require('./models/companies');
const Jobs = require('./models/postings');

const Query = {
    company: async (root, args) => await Companies.findById(args.id).exec(),
    job: async (root, args) => await Jobs.findById(args.id).exec(),
    jobs: async () => await Jobs.find().exec(),
};

const Mutation = {
    createJob: async (root, { input: { companyId, title, description } }, context) => {
        if (!context.user) {
            throw new Error('Unauthorized');
        }

        const jobs = new Jobs({
            title,
            description,
            company: companyId,
        });
        return jobs.insert();
    },
};

const Job = {
    company: async job => await Companies.findById(job.company).exec(),
};

const Company = {
    jobs: async company => await Jobs.find({ company: company.id }).exec(),
};

module.exports = {
    Query,
    Mutation,
    Job,
    Company,
};
