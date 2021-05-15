/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-24 10:14:05
 * @,@LastEditTime: ,: 2020-12-29 23:48:04
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\chat.js
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Chat = require('../models/Chat');

// $route  POST api/chat/addmsg
// 添加消息记录

router.post('/addmsg', passport.authenticate('jwt', { session: false }), (req, res) => {
    const chatFields = {};
    // 判断用户是否存在
    Chat.findOne({ target: req.body.target, user_id: req.body.user_id })
        .then(chat => {
            if (!chat) {
                if (req.body.target) chatFields.target = req.body.target;
                if (req.body.user_id) chatFields.user_id = req.body.user_id;
                chatFields.count = req.body.count;
                if (req.body.message) chatFields.message = req.body.message;
                new Chat(chatFields).save().then(chat => res.json(chat));
            }
            else {
                chat.message = req.body.message;
                chat.count = req.body.count;
                chat.save().then(chat => res.json(chat));
            }
        })


})

// $route  GET api/chat/msg/:user_id
// @desc   获取用户的所有消息记录
// @access private
router.get('/msg/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Chat.find()
        .then(chats => {
            if (!chats) {
                errors.nochat = "没有任何消息";
                res.status(404).json(errors);
            }
            let result = chats.filter(chat => {
                return chat.user_id == req.params.user_id
            })
            res.json(result);
        })
        .catch(err => res.status(404).json(err));
})

//    获取所有信息


router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Chat.find()
        .then(chat => {
          if (!chat) {
            return res.status(404).json('没有任何内容');
          }
  
          res.json(chat);
        })
        .catch(err => res.status(404).json(err));
    }
  );
  
  
  //  获取单个信息
  
  
  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Chat.findOne({ _id: req.params.id })
        .then(chat => {
          if (!chat) {
            return res.status(404).json('没有任何内容');
          }
  
          res.json(chat);
        })
        .catch(err => res.status(404).json(err));
    }
  );
//  删除信息接口

router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Chat.findOneAndRemove({ _id: req.params.id })
        .then(chat => {
          chat.save().then(chat => res.json(chat));
        })
        .catch(err => res.status(404).json('删除失败!'));
    }
  );  

module.exports = router;