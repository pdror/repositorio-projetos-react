const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = mongoose.model('users');
const Project = mongoose.model('projects');
const { slugify, idify } = require('../helpers/slugify')
const { isUser, isStudent, isTeacher } = require('../helpers/isAdmin')
const randomString = require('../helpers/randomString')
require('dotenv').config();
const router = express.Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if(err) {
            return next(err)
        }
        if(!user) {
            return res.send("Bad credentials")
        }
        req.login(user, () => {
            /* const body = { _id: user.id, email: user.email }
            const token = jwt.sign({ user: body }, process.env.SECRET)
            return res.json({token}) */
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
        })
    })(req, res, next)
});

// STUDENTS ENDPOINTS

router.get('/students', isUser, (req, res) => {
    console.log("cheuguei aqui");
    User.find({ isTeacher: false })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/students/add', (req, res) => {
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

// TEACHERS ENDPOINTS

router.get('/teachers', (req, res) => {
    User.find({ isTeacher: true })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/teachers/add', (req, res) => {
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

// PROJECTS endpoints

router.get('/projects', (req, res) => {
    Project.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/projects/add', (req, res) => {
    const newProject = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        slug: slugify(req.body.nome + randomString(4)),
        //professor: req.body.professor //MODIFICAR
    }
    console.log(newProject);

    new Project(newProject).save().then(() => {
        res.json(newProject);
    }).catch(err => {
        res.status(400).json(err);
    });
})

module.exports = router;
