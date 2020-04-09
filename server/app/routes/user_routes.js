'use strict';
const userController = require('../controllers/UserController');

module.exports = (app) => {
    app.route('/signup')
       .post(userController.signup);
}