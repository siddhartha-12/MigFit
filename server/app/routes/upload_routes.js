'use strict';
const uploadController = require('../controllers/UploadController');

module.exports = (app) => {

    app.post('/fitness/upload', uploadController.post);
    app.put('/fitness/upload/:id', uploadController.update);
    app.get('/fitness/upload/:id', uploadController.get);
    app.get('/fitness/upload/', uploadController.getTotal);
    app.delete('/fitness/upload/:id', uploadController.delete)
    // app.route('/fitness/upload')
    //    .get(uploadController.get)
    //    .post(uploadController.post);
    // app.route('/fitness/upload/:id')
    //     .get(uploadController.get)
    //     .put(uploadController.update)
    //     .delete(uploadController.delete);
};