const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const uploadSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
});

uploadSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

//add mongoose unique validator
uploadSchema.plugin(uniqueValidator);

uploadSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Upload', uploadSchema);