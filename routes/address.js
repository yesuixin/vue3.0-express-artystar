/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:48:48
 * @,@LastEditTime: ,: 2021-01-29 14:25:36
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\address.js
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Address = require('../models/Address');



// $route  POST api/address/add
//    创建 发布用的
//定义一个addressfield的方法 将前端传过来的一些处理一下
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const addressFields = {};
    if (req.body.avatar) addressFields.avatar = req.body.avatar;
    if (req.body.name) addressFields.name = req.body.name;
    if (req.body.follow) addressFields.follow = req.body.follow;
    if (req.body.status) addressFields.status = req.body.status;
    if (req.body.addressid) addressFields.addressid = req.body.addressid;
    if (req.body.followid) addressFields.followid = req.body.followid;


//存储数据 存储成功返回一下
    new Address(addressFields).save().then(address => res.json(address));
  }
);



// $route  GET api/address/latest
//    下拉刷新的接口

router.get(
  '/latest',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Address.find()//获取全部信息先·在进行筛选sort方法排列 -1就有一个倒序
      .sort({ date: -1 })
      .then(address => {//请求成功就拿到所有的内容
        if (!address) {
          res.status(404).json('没有任何用户信息');
        } else {
          
        
          res.json(address);
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
    Address.findOne({ addressid: req.params.id })
      .then(address => {
        if (!address) {
          return res.status(404).json('没有任何内容');
        }

        res.json(address);
      })
      .catch(err => res.status(404).json(err));
  }
);

//  获取关注的人的动态


router.get(
  '/follow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Address.find({ follow: req.params.follow }).populate('addressid')//获取全部信息先·在进行筛选sort方法排列 -1就有一个倒序
      .sort({ date: -1 })
      .then(address => {//请求成功就拿到所有的内容
        if (!address) {
          res.status(404).json('没有任何用户信息');
        } else {
          
        
          res.json(address);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

//    编辑信息接口(设置备注)

router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const addressFields = {};

    if (req.body.name) addressFields.name = req.body.name;
   

    Address.findOneAndUpdate(
      { _id: req.params.id },
      { $set: addressFields },
      { new: true }
    ).then(address => res.json(address));
  }
);

// 
//  删除信息接口

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Address.findOneAndRemove({ _id: req.params.id })
      .then(address => {
        address.save().then(address => res.json(address));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);
module.exports = router;
