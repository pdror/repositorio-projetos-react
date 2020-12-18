const localStrategy = require('passport-local').Strategy
//const BasicStrategy = require('passport-http').BasicStrategy
const passportJWT = require("passport-jwt")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config();

// Require User database
require('../models/User.model')
const User = mongoose.model('users')

JWTStrategy = passportJWT.Strategy

module.exports = function(passport) {
    /* passport.use(new JWTStrategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrkey: process.env.JWT_SECRET
    }, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.user._id })
            .then(() => done(null, user))
            .catch(() => done(null, false, { message: "Token mismatch "}));
    })) */

    /* passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (email, password, done) => {
        User.findOne({email: email}).then((user) => {
            if(user) {
                console.log('usuario encontrado na base de dados')
            }

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
    })) */

    /* passport.use(new JWTStrategy({
        jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrkey: "jwt_secret"
    }, (jwt_payload, done) => {
        User.findOne({ email: email }, (err, user) => {
            bcrypt.compare(password, user.password, (error, match) => {
                if(match) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Dados incorretos'})
                }
            })
        })
    })); */

    /* passport.use(new BasicStrategy({usernameField: 'email', passwordField: 'password'},
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            bcrypt.compare(password, user.password, (error, match) => {
                if(match) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Dados incorretos'})
                }
            })
          });
        }
    ));
    */
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        User.findOne({email: email}).then((user) => {
            if(user) {
                console.log('usuario encontrado na base de dados')
            }

            if(!user) {
                console.log('cheguei aqui')
                return done(null, false, {message: 'Não existe um usuário com este email'})
            }

            bcrypt.compare(password, user.password, (error, match) => {
                if(match) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Dados incorretos'})
                }
            })
        }) 
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}