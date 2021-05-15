/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-10-31 10:23:59
 * @,@LastEditTime: ,: 2021-01-28 17:15:17
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\User.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,

  },

  avatar: {
    type: String
  },
  typeid: {
    type: String
  },
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },


});

module.exports = Comment = mongoose.model('comments', CommentSchema);