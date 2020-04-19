'use strict';
const mongoose = require('mongoose');
const Upload = require('../models/upload');

exports.createUploadSRC = (upload) => {
    const newUpload = new Upload(upload);
    return newUpload.save();
}

exports.updateUpload = (updateUpload) => {
    const promise = Upload.findByIdAndUpdate(updateUpload._id, updateUpload);
    // console.log(promise);
    return promise;
}

exports.getUploadById = (uploadId) => {
    const promise = Upload.findById(uploadId).exec();
    return promise;
}

exports.getAll = () => {
    const promise = Upload.find().exec();
    return promise;
}

exports.deleteUpload = (uploadId) => {
    const promise = Upload.findOneAndRemove(uploadId).exec();
    return promise;
}