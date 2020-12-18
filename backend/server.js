const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const passportJWT = require("passport-jwt");
const cookieParser = require("cookie-parser");
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

require('dotenv').config();
//require('./models/User.model')
//const User = mongoose.model('users')
//JWTStrategy = passportJWT.Strategy;

const app = express();
const port = process.env.PORT || 5000;

// BANCO DE DADOS
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established');
});

app.use(cors());
app.use(express.json());
app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./config/auth')(passport)

/* passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.user._id })
        .then(() => done(null, user))
        .catch(() => done(null, false, { message: "Token mismatch"}));
}));

passport.use(new localStrategy({
    usernameField: "email"
}, (email, password, done) => {
    User.findOne({email: email}).then((user) => {
        if(!user) {
            return done(null, false, {message: 'Usuário não encontrado'})
        }

        bcrypt.compare(password, user.password, (error, match) => {
            if(match) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Dados incorretos'})
            }
        })
    })
})); */

app.use(express.static(path.join(__dirname, "../build")))

// ROUTES
const usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students');
const teachersRouter = require('./routes/teachers');
const projectsRouter = require('./routes/projects');
const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

/* app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/projects', projectsRouter); */

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname), "../build/index.html");
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})