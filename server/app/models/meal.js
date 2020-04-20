'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for meal object.
 */
let MealSchema = new Schema({
  User_Id: {
    type: String
  },
  Food: {
    type: String,
    required: 'Kindly enter the title of the task'
  },
  Description: {
    type: String
  },
  Calories: {
    type: String
  },
  Quantity : {
    type: Number
  }
},
{
    versionKey: false
});
// Duplicating the _id field to id
MealSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// serializing virtual fields
MealSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('meal', MealSchema);