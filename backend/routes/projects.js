var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
require('../models/Project.model')
const Project = mongoose.model('projects')
const { isUser, isStudent, isTeacher } = require('../helpers/isAdmin')
const { slugify, idify } = require('../helpers/slugify')
const randomString = require('../helpers/randomString')

router.get('/', (req, res) => {
    Project.find()
        .then((projects) => {
            res.json(projects);
        }).catch(err => {
            res.status(400).json("Error fetching projects");
        });
});

router.post('/add', (req, res) => {
    const newProject = {
        title: req.body.title,
        description: req.body.description,
        slug: slugify(req.body.title + randomString(4)),
        instructor: req.body.instructor //MODIFICAR
    }

    new Project(newProject).save().then(() => {
        res.json(newProject);
    }).catch(err => {
        res.status(400).json(err);
    });
})

module.exports = router;