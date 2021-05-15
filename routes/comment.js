/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:48:48
 * @,@LastEditTime: ,: 2021-01-28 17:27:45
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\comment.js
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Comment = require('../models/Comment');



// $route  POST api/comment/add
//    创建 发布用的
//定义一个commentfield的方法 将前端传过来的一些处理一下
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const commentFields = {};
    if (req.body.name) commentFields.name = req.body.name;
    if (req.body.avatar) commentFields.avatar = req.body.avatar; 
    if (req.body.typeid) commentFields.typeid = req.body.typeid; 
    if (req.body.text) commentFields.text = req.body.text; 
//存储数据 存储成功返回一下
    new Comment(commentFields).save().then(comment => res.json(comment));
  }
);



// $route  GET api/comment/latest
//    下拉刷新的接口

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.find({typeid:req.params.id})//获取全部信息先·在进行筛选sort方法排列 -1就有一个倒序
      .sort({ date: -1 })
      .then(comment => {//请求成功就拿到所有的内容
        if (!comment) {
          res.status(404).json('没有任何用户信息');
        } else {
          
        
          res.json(comment);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);


module.exports = router;
