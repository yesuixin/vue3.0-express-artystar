/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:45:47
 * @,@LastEditTime: ,: 2021-01-29 16:05:56
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\Moment.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MomentSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },//关联users
  
  img: {
    type: String,
   
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imgs: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Moment = mongoose.model('moment', MomentSchema);
