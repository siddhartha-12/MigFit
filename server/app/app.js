'use strict';

module.exports = (app) => {
    const userRoute = require('./routes/user_routes');
    const models = require('./models/index');
    const uploadRoute = require('./routes/upload_routes');
    userRoute(app);
    uploadRoute(app);
}