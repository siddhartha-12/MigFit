'use strict';
const mongoose = require('mongoose'),
      Comment = require('../models/comment');
    
exports.createComment = (comment) => {
    const newComent = new Comment(comment);
    return newComent.save();
}

exports.getCommentByUploadId = (uploadId) => {
    const promise = Comment.find({'uploadId': uploadId});
    return promise;
}

exports.deleteComment = (commentId) => {
    const promise = Comment.findOneAndDelete(commentId).exec();
    return promise;
}