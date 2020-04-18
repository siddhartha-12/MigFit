'use strict';
const userController = require('../controllers/UserController');

module.exports = (app) => {
    app.post('/user/signup', userController.signup);
    app.post('/user/login', userController.login);
    app.route('/fitness/profile/:id')
        .get(userController.getUser)
        .put(userController.updateUser);
}