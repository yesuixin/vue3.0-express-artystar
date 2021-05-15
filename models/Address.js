/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-10-31 10:23:59
 * @,@LastEditTime: ,: 2021-01-29 14:15:32
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\User.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AddressSchema = new Schema({
  name: {
    type: String,
    required: true,

  },
  addressid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Moment'
    },

  avatar: {
    type: String
  },
  followid: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },
  follow: {
    type: String
  },
  status: {
    type: String
  }
});

module.exports = Address = mongoose.model('addresss', AddressSchema);