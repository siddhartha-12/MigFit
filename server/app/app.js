'use strict';

module.exports = (app) => {
    const userRoute = require('./routes/user_routes');
    const models = require('./models/index');
    const uploadRoute = require('./routes/upload_routes');
    const videoRoute = require('./routes/video_routes');
    userRoute(app);
    uploadRoute(app);
    videoRoute(app);
}