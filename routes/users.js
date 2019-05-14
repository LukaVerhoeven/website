var express = require('express');
var router = express.Router();
var mongoose  = require("mongoose");
var bcrypt  = require("bcryptjs");
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var checkAuth = require('../middleware/check-auth');

router.post('/signup', function(req, res, next) {
 User.find({email: req.body.email}).exec()
     .then(user => {
         console.log("409",  user);
         if(user.length>0){
             return res.status(409).json({
                 message: "mail exists"
             });
         }
         else{
             bcrypt.hash(req.body.password, 10, (err,hash)=>{
                 if(err){
                     console.log("500",  err);
                     return res.status(500).json({
                         error: err
                     })
                 }else{
                     console.log("201");
                     const user = new User({
                         _id: new mongoose.Types.ObjectId(),
                         email: req.body.email,
                         password: hash
                     });

                     user.save()
                     .then(result => {
                         console.log(result);
                         res.status(201).json({
                             message: "user created"
                         })
                     })
                     .catch(err => {
                       console.log(err);
                       res.status(500).json({
                           error: err
                       });
                     });

                 }
             });
         }
     });

});

router.post('/login', function(req, res, next) {
    User.findOne({email: req.body.email}).exec()
        .then(user => {
            if(!user){
                return res.status(401).json({
                    error: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user.password, (err,result)=>{
                console.log(err,result);
                if(err){
                    return res.status(401).json({
                        error: "Auth failed"
                    });
                }
                if(result){
                    //if admin => generate Token
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                        // process.env.JWT_KEY
                        "secret",{
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        error: "Auth succesfull",
                        token: token
                    });
                }
            });
        }).catch(err=>{
            console.log(err);
            res.status("500").json({
                error: err
            })
    });
});


router.post('/testAuth', checkAuth , function(req, res, next) {
    res.status(200).json({
        message: 'secure auth function succes'
    })
});
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
