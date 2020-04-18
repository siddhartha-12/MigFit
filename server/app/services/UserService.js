'use strict';
const mongoose = require('mongoose');
    //   User = mongoose.model('User');
const User = require('../models/User');

//create a user to register
exports.createUser = (user) => {
    const newUser = new User(user);
    return newUser.save();
}

//find a user by id
exports.getUserById = (userId) => {
    const promise = User.findById(userId).exec();
    return promise;
}

//find a user by email
exports.getUserByEmail = (userEmail) => {
    const promise = User.findOne({email: userEmail});
    return promise;
}

exports.updateUser = (user) => {
    const promise = User.findByIdAndUpdate(user.id, user).exec();
    return promise;
}