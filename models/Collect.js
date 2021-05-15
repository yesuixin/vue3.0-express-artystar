/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-10-31 10:23:59
 * @,@LastEditTime: ,: 2021-01-28 17:05:14
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\User.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CollectSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  collectid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Moment'
    },
    status: {
      type: String
    }
});

module.exports = Collect = mongoose.model('collects', CollectSchema);