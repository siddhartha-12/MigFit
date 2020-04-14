const express = require("express");

const Upload = require("../models/upload");

const uploadService = require('../services/UploadService');

const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
  

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "backend/images");
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


exports.post = ("", multer({storage: storage }).single("image"),
    (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let newUpload = {};
    newUpload.title = req.body.title;
    newUpload.content = req.body.content;
    newUpload.imagePath = url + "/image/" + req.file.filename;
    uploadService.createUploadSRC(newUpload)
        .then(createdUpload => {
            res.status(201).json({
              message: "upload added successfully",
              uploadId: createdUpload._id
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                message: "created fail"
            })
        });
    }
);

exports.update =(
    "/:id",
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
    const uploadId = req.params.id;
    let imagePath = req.body.imagePath;
    const upload = Object.assign({}, req.body);
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        upload.imagePath = url + "/images/" + req.file.filename
    }
    upload.id = uploadId;
    upload.title = req.body.title;
    upload.content = req.body.content;
    
    uploadService.updateUpload(upload)
        .then(result => {
            res.status(200).json({ message: "Update successful!" });
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                message:"upload fail"
            });
        });
});
//5e91fbdf4f4a7173eb2a5682

exports.getTotal = (req, res, next) => {
    uploadService.getAll()
        .then(documents => {
            res.status(200).json({
              message: "uploads get successfully!",
              uploads: documents
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "get fail"
            })
        });
};

exports.get = (req, res, next) => {
    const uploadId = req.params.id;
    uploadService.getUploadById(uploadId)
        .then(upload => {
            console.log(upload);
              res.status(200).json(upload);
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "get fail"
            })
        })
};

exports.delete = (req, res, next) => {
    uploadService.deleteUpload(req.body.id)
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "upload deleted!" });
          });
}


