const Companies = require('../../models/companies');
const mongoose = require('mongoose');
const Postings = require('../../models/postings');
const Users = require('../../models/users');

const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://job:boards@localhost:27017/jobBoards', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const insertData = async () => {
    const companies = await Companies.find().exec();
    const postings = await Postings.find().exec();
    const users = await Users.find().exec();

    if (!companies.length) {
        Companies.insertMany([
            {
                _id: mongoose.Types.ObjectId("5d9df4b0b01527c99b96ea9f"),
                name: "Facegle",
                description: "We are a startup on a mission to disrupt social search engines. Think Facebook meet Google."
            },
            {
                _id: mongoose.Types.ObjectId("5d9df4b0b01527c99b96eaa0"),
                name: "Goobook",
                description: "We are a startup on a mission to disrupt search social media. Think Google meet Facebook."
            }
        ]);
    }

    if (!postings.length) {
        Postings.insertMany([
            {
                _id: mongoose.Types.ObjectId("5d9df78eb01527c99b96eaa1"),
                company: mongoose.Types.ObjectId("5d9df4b0b01527c99b96ea9f"),
                title: "Frontend Developer",
                description: "We are looking for a Frontend Developer familiar with React."
            },
            {
                _id: mongoose.Types.ObjectId("5d9df78eb01527c99b96eaa2"),
                company: mongoose.Types.ObjectId("5d9df4b0b01527c99b96ea9f"),
                title: "Backend Developer",
                description: "We are looking for a Backend Developer familiar with Node.js and Express."
            },
            {
                _id: mongoose.Types.ObjectId("5d9df78eb01527c99b96eaa3"),
                company: mongoose.Types.ObjectId("5d9df4b0b01527c99b96eaa0"),
                title: "Full-Stack Developer",
                description: "We are looking for a Full-Stack Developer familiar with Node.js, Express, and React."
            }
        ]);
    }

    if (!users.length) {
        Users.insertMany([
            {
                _id: mongoose.Types.ObjectId("5d9df4b0b01527c99b96ea9f"),
                email: "alice@facegle.io",
                password: bcrypt.hashSync("alice123", saltRounds),
                company: mongoose.Types.ObjectId("5d9df4b0b01527c99b96ea9f")
            },
            {
                _id: mongoose.Types.ObjectId("5d9df4b0b01527c99b96eaa0"),
                email: "bob@goobook.co",
                password: bcrypt.hashSync("bob123", saltRounds),
                company: mongoose.Types.ObjectId("5d9df4b0b01527c99b96eaa0")
            }
        ]);
    }

    mongoose.disconnect();
};

exports.insertData = insertData;
