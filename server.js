const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const mongoose = require('mongoose');
const port = 9000;
const saltRounds = 10;

const app = express();

mongoose.connect('mongodb://job:boards@localhost:27017/jobBoards', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.sendStatus(401);
        return;
    }

    const hashPwd = bcrypt.hashSync(password, saltRounds);
    const user = await Users.findOne({ email }).exec();

    if (!user || user.password !== hashPwd) {
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
        _id: new mongoose.Types.ObjectId(),
        email,
        password: bcrypt.hashSync(password, saltRounds),
    });
    user.save();

    res.send({
        message: 'User added!',
    });
});

app.listen(port, () => console.info(`server running on port ${port}`));
