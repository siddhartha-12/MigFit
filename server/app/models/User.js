'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema ({
    username : {
        type: string,
        required: "username is missing"
    },
    email : {
        type: string,
        required: "email is required",
        unique: true
    },
    password: {  
        type: string,
        required: "password is missing"
    },
    videos: [{
        type : Schema.Types.ObjectId,
        ref: 'Video'
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],

}, {
    versionKey: false
});

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
})