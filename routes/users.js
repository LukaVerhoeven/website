var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');
var  UserController = require('../controllers/users');

router.post('/signup', UserController.register);

router.post('/login', UserController.login);

router.post('/testAuth', checkAuth , UserController.testAuth);
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
