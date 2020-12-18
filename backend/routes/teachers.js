const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../models/User.model.js')
const User = mongoose.model('users')
const { isUser, isStudent, isTeacher } = require('../helpers/isAdmin')

router.get('/', (req, res) => {
    User.find({ isTeacher: true })
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
    })   
});

module.exports = router;