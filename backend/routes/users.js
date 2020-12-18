const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../models/User.model.js')
const User = mongoose.model('users')
const { isUser, isStudent, isTeacher } = require('../helpers/isAdmin')

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user) 
            res.status(400).json('User already exists');
        
        
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        
        if(req.body.role == 'TEACHER') {
            newUser.isTeacher = true;
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    res.status(400).json('Error while creating user');
                }
                newUser.password = hash
    
                new User(newUser).save().then(() => {
                    res.json(newUser)
                }).catch((err) => {
                    res.status(400).json('Error while creating user');
                })
            })
        })
    }).catch((err) => {
        res.status(400).json('Error');
    });
});

router.get('/form', function(req, res) {
    res.render('users/form', {title: 'Cadastro de Usuário'});
});

router.post('/new', (req, res, next) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user) {
            res.status(400).json('User already exists')
        } else {
            if(req.body.password != req.body.check) {
                req.flash('error_msg', 'As senhas não combinam')
                res.redirect('/users/form')
            }

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            if(req.body.role == 'TEACHER') {
                newUser.isTeacher = true
            }
        
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        req.flash('error_msg', 'Não foi possível criar usuário')
                        res.redirect('/')
                    }
                    newUser.password = hash
        
                    new User(newUser).save().then(() => {
                        req.flash('success_msg', 'Novo usuário cadastrado. Realize o login!')
                        res.redirect('/')
                    }).catch((err) => {
                        req.flash('error_msg', 'Não foi possível realizar seu cadastro!')
                        res.redirect('/users/form')
                    })
                })
            })
        }
    }).catch((err) => {
        req.flash('error_msg', 'Erro interno')
        res.redirect('/')
    }) 
})

router.get('/login', (req, res, next) => {
    if(isUser) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

router.post('/login', (req, res, next) => {
    /* passport.authenticate('basic', {
        /* successRedirect: '/', // MODIFICAR
        failureRedirect: '/',
        failureFlash: true
        res.json({ id: req.user.id, email: req.user.email });
    })(req, res, next) */

    passport.authenticate('local', { session : true }, (req, res) => {
        res.status(200);
    })(req,res,next)
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})
module.exports = router;