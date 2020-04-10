'use strict';
const userController = require('../controllers/UserController');

module.exports = (app) => {
    app.route('/user/signup')
       .post(userController.signup);
    app.route('/user/login')
        .post(userController.login);
}