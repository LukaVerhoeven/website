// var app = require('../app');
var express = require('express');
var router = express.Router();
var  UserController = require('../controllers/users');

// router.post('/signup', UserController.register);
/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('auth/login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
    res.render('auth/register', { title: 'Express' });
});

router.post('/register', UserController.register);


module.exports = router;
