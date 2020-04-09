'use strict';

module.exports = (app) => {
    const userRoute = require('./routes/user_routes');
    const models = require('./models/index');
    userRoute(app);
}