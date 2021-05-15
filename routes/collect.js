/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:48:48
 * @,@LastEditTime: ,: 2021-01-29 14:37:59
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\collect.js
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Collect = require('../models/Collect');



// $route  POST api/collect/add
//    创建 发布用的
//定义一个collectfield的方法 将前端传过来的一些处理一下
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const collectFields = {};
    if (req.body.username) collectFields.username = req.body.username;
    if (req.body.collectid) collectFields.collectid = req.body.collectid;
    if (req.body.status) collectFields.status = req.body.status;  
//存储数据 存储成功返回一下
    new Collect(collectFields).save().then(collect => res.json(collect));
  }
);



// $route  GET api/collect/latest
//    下拉刷新的接口

router.get(
  '/latest',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Collect.find({username:username}).popular('collectid')//获取全部信息先·在进行筛选sort方法排列 -1就有一个倒序
      .sort({ date: -1 })
      .then(collect => {//请求成功就拿到所有的内容
        if (!collect) {
          res.status(404).json('没有任何用户信息');
        } else {
          
        
          res.json(collect);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);
//  获取单个信息


router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Collect.findOne({ collectid: req.params.id })
      .then(collect => {
        if (!collect) {
          return res.status(404).json('没有任何内容');
        }

        res.json(collect);
      })
      .catch(err => res.status(404).json(err));
  }
);
// 
//  删除信息接口

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Collect.findOneAndRemove({ _id: req.params.id })
      .then(collect => {
        collect.save().then(collect => res.json(collect));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);
module.exports = router;
