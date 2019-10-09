const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const mongoose = require('mongoose');
const port = 9000;

const app = express();

mongoose.connect('mongodb://job:boards@localhost:27017/jobBoards', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Postings = require('./models/postings');

app.use(
    cors(),
    bodyParser.json(),
    expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    })
);

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = {
        password: '',
    };

    if (!user && user.password !== password) {
        res.sendStatus(401);
        return;
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
});

app.listen(port, () => console.info(`server running on port ${port}`));
