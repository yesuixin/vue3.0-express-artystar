/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:45:47
 * @,@LastEditTime: ,: 2021-01-08 18:49:11
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\Moment.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ShopSchema = new Schema({

  img: {
    type: String,
   
  },//图片名字副名文章评分标签类型地址经纬度
  name: {
    type: String,
    required: true
  },
date:{
  type: String,
},

  text: {
    type: String,
    required: true
  },

 stars:{
  type: String,
 },
 tag:{
  type: [String],
 },
 address:{
  type: String,
 },
 link:{
  type: String,
 }
});

module.exports = Shop = mongoose.model('shop', ShopSchema);
