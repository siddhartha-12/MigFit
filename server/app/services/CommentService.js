'use strict';
const mongoose = require('mongoose'),
      Comment = require('../models/comment');
/**
 * create new comment */    
exports.createComment = (comment) => {
    const newComent = new Comment(comment);
    return newComent.save();
}

/**
 * search comment by upload id
 */
exports.getCommentByUploadId = (uploadId) => {
    const promise = Comment.find({uploadId: uploadId}).exec();
    return promise;
}

/**
 * delete a comment
 */
exports.deleteComment = (commentId) => {
    const promise = Comment.findOneAndDelete(commentId).exec();
    return promise;
}