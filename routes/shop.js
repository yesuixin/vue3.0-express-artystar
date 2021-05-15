/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2021-01-08 18:15:20
 * @,@LastEditTime: ,: 2021-01-08 18:20:00
 * @,@LastEditors: ,: your name
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\shop.js
 */
var express = require('express');
var router = express.Router();
const Profile = require('../models/Shop');

//    获取所有信息


router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        if (!profile) {
          return res.status(404).json('没有任何内容');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);






module.exports = router;
