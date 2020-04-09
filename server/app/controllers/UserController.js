'use strict';
const userService = require('../services/UserService'),
      User = require('../models/User'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    let newUser = {};
    //convert the password to hashcode using bcrypt
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //create a new user instance
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.password = hash;
            //use createUser in Services
            userService.createUser(newUser)
                .then(result => {
                    res.status(201).json({
                        message: "User created.",
                        result: result,
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                    console.log("got error");
                });
        });
};

//login
exports.login = (req, res, next) => {
    let fetchedUser;
    //find the user by email
    userService.getUserByEmail(req.body.email)
        .then(user => {
            //if user not exist
            if (!user) {
                return res.status(401).json({
                    message: "email is wrong"
                });
            }
            //else compare bcrypt password with user password in db
            bcrypt.compare(req.body.email, user.passowrd);
            fetchedUser = user;
        })
        //catch the result
        .then(result => {
            //if result is null
            if (!result) {
                return res.status(401).json({
                    message: "wrong password"
                });
            }
            //authenticate successfully, use token to store this user
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id}, 
                'secret_this_should_be_longer',
                { expiresIn: "1h"});
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
}