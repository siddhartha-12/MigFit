'use strict';
const uploadController = require('../controllers/UploadController');
const checkAuth = require('../middleware/check-auth');
const multer = require("multer");
const fs = require('fs');
const public_path = './public';
const media_dir = public_path+'/media';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "video/mp4": "mp4",
    "video/x-flv": "flv",
    "video/3gpp": "3gp",
    "video/x-ms-wmv": "wmv",
    "video/x-msvideo": "avi",
    "video/quicktime": "mov"
  };
  

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      if (!fs.existsSync(media_dir)){
          fs.mkdir(media_dir, {recursive: true}, err => {})
      }
      cb(error, media_dir);
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

module.exports = (app) => {
    
    app.post('/fitness/upload', multer({storage: storage }).single("media"), uploadController.post);
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
