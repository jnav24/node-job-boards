const { ApolloServer, gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const fs = require('fs');
const init = require('./scripts/js/init');
const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const port = 9000;
const saltRounds = 10;

const app = express();

init.insertData();

const Companies = require('./models/companies');
const Postings = require('./models/postings');
const Users = require('./models/users');

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    })
);

const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers');
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        method: req.method,
        user: req.user,
    })
});
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.get('/postings', async (req, res) => {
    try {
        const postings = await Postings
            .find()
            .populate('company')
            .exec();

        if (!postings) {
            throw new Error('Unable to get postings');
        }

        return res.status(200).send({
            status: 200,
            data: postings,
        });
    } catch (error) {
        const message = error.message || 'An unexpected error has occurred';
        return res.status(401).send({
            status: 401,
            message,
        });
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.sendStatus(401);
        return;
    }

    const user = await Users.findOne({ email }).exec();

    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.sendStatus(401);
        return;
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
});

app.post('/register', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.sendStatus(401);
        return;
    }

    const user = new Users({
        email,
        password: bcrypt.hashSync(password, saltRounds),
    });
    user.insert();

    res.send({
        message: 'User added!',
    });
});

app.listen(port, () => console.info(`server running on port ${port}`));
