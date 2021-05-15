/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:48:48
 * @,@LastEditTime: ,: 2021-01-13 00:54:32
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\party.js
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Party = require('../models/Party');

// $route  GET api/party
// 获取当前登录用户的个人信息

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Party.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(party => {
        if (!party) {
          errors.noparty = '该用户的信息不存在~!';
          return res.status(404).json(errors);
        }

        res.json(party);
      })
      .catch(err => res.status(404).json(err));
  }
);

// $route  POST api/party/add
//    创建 发布用的
//定义一个partyfield的方法 将前端传过来的一些处理一下
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const partyFields = {};
    if (req.body.img) partyFields.img = req.body.img;
    if (req.body.name) partyFields.name = req.body.name;
    if (req.body.text) partyFields.text = req.body.text;

    // skills - 数组转换
    //因为前端有多张图片用 这个符号分割一下
    if (req.body.imgs) {
      partyFields.imgs = req.body.imgs.split('|');
    }
//存储数据 存储成功返回一下
    new Party(partyFields).save().then(party => res.json(party));
  }
);



// $route  GET api/party/latest
//    下拉刷新的接口

router.get(
  '/latest',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Party.find()//获取全部信息先·在进行筛选sort方法排列 -1就有一个倒序
      .sort({ date: -1 })
      .then(party => {//请求成功就拿到所有的内容
        if (!party) {
          res.status(404).json('没有任何用户信息');
        } else {
          
        
          res.json(party);
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
    Party.findOne({ _id: req.params.id })
      .then(party => {
        if (!party) {
          return res.status(404).json('没有任何内容');
        }

        res.json(party);
      })
      .catch(err => res.status(404).json(err));
  }
);


//    编辑信息接口

router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const partyFields = {};

    if (req.body.img) partyFields.img = req.body.img;
    if (req.body.name) partyFields.name = req.body.name;
    if (req.body.text) partyFields.text = req.body.text;

    Party.findOneAndUpdate(
      { _id: req.params.id },
      { $set: partyFields },
      { new: true }
    ).then(party => res.json(party));
  }
);

// 
//  删除信息接口

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Party.findOneAndRemove({ _id: req.params.id })
      .then(party => {
        party.save().then(party => res.json(party));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);
module.exports = router;
