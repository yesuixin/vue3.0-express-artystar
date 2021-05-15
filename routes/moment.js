/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-17 14:48:48
 * @,@LastEditTime: ,: 2021-02-04 13:04:37
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\moment.js
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Moment = require('../models/Moment');

// $route  GET api/moment
// 获取当前登录用户的个人信息

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Moment.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(moment => {
        if (!moment) {
          errors.nomoment = '该用户的信息不存在~!';
          return res.status(404).json(errors);
        }

        res.json(moment);
      })
      .catch(err => res.status(404).json(err));
  }
);

// $route  POST api/moment/add
//    创建 发布用的
//定义一个momentfield的方法 将前端传过来的一些处理一下
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const momentFields = {};
    if (req.body.img) momentFields.img = req.body.img;
    if (req.body.name) momentFields.name = req.body.name;
    if (req.body.text) momentFields.text = req.body.text;
    if (req.body.userid) momentFields.userid = req.body.userid;

    // skills - 数组转换
    //因为前端有多张图片用 这个符号分割一下
    if (req.body.imgs) {
      momentFields.imgs = req.body.imgs.split('|');
    }
//存储数据 存储成功返回一下
    new Moment(momentFields).save().then(moment => res.json(moment));
  }
);



// $route  GET api/moment/latest
//    下拉刷新的接口

router.get(
  '/latest',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Moment.find()//获取全部信息先·在进行筛选sort方法排列 -1就有一个倒序
      .sort({ date: -1 })
      .then(moment => {//请求成功就拿到所有的内容
        if (!moment) {
          res.status(404).json('没有任何用户信息');
        } else {
          
        
          res.json(moment);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

//    获取所有信息


router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Moment.find()
      .then(moment => {
        if (!moment) {
          return res.status(404).json('没有任何内容');
        }

        res.json(moment);
      })
      .catch(err => res.status(404).json(err));
  }
);


//  获取单个信息


router.get(
  '/comm/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Moment.findOne({ _id: req.params.id })
      .then(moment => {
        if (!moment) {
          return res.status(404).json('没有任何内容');
        }

        res.json(moment);
      })
      .catch(err => res.status(404).json(err));
  }
);
//  获取单个信息


router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Moment.find({ userid: req.params.id })
      .then(moment => {
        if (!moment) {
          return res.status(404).json('没有任何内容');
        }

        res.json(moment);
      })
      .catch(err => res.status(404).json(err));
  }
);
//  删除信息接口

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Moment.findOneAndRemove({ _id: req.params.id })
      .then(moment => {
        moment.save().then(moment => res.json(moment));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);  

module.exports = router;
