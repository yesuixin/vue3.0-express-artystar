/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:45:47
 * @,@LastEditTime: ,: 2021-01-09 22:55:13
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\Moment.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CardSchema = new Schema({
  user: {
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
  },
 //图片名字副名文章评分标签类型地址经纬度

//  stars:{
//   type: String,
//  },
//  tag:{
//   type: [String],
//  },
//  address:{
//   type: String,
//  },
//  link:{
//   type: String,
//  }
});

module.exports = Card = mongoose.model('card', CardSchema);
