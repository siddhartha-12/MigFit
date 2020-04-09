'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VideoSchema = new Schema({
    user_id : {
        type: String,
        required: "user_id is missing"
    }
}, {
    versionKey: false
});

VideoSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

module.exports = mongoose.model('Video', VideoSchema);