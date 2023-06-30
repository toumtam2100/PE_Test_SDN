const express = require('express');
const bodyParser = require('body-parser');
const Teachers = require('../models/teacher');
var authenticate = require('../authenticate');

const teacherRouter = express.Router();

teacherRouter.use(bodyParser.json());

teacherRouter.route('/')
.get((req,res,next) => {
    Teachers.find({})
    .then((teachers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Teachers.create(req.body)
    .then((teacher) => {
        console.log('Teacher created ', teacher);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /teachers');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Teachers.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

teacherRouter.route('/:teacherId')
.get((req,res,next) => {
    Teachers.findById(req.params.teacherId)
    .then((teacher) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /teachers/'+ req.params.teacherId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Teachers.findByIdAndUpdate(req.params.teacherId, {
        $set: req.body
    }, { new: true })
    .then((teacher) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Teachers.findByIdAndRemove(req.params.teacherId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = teacherRouter;