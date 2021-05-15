/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-10-31 10:01:07
 * @,@LastEditTime: ,: 2021-01-13 01:02:19
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\routes\users.js
 */
var express = require('express');
var router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');//引入token
const bcrypt = require('bcryptjs');//引入加密
// const gravatar = require('gravatar');//引入头像
const passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册!');
    } else {
      //引入头像像素200 pg格式 mm头像
//没有占有就创建新的
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      
        password: req.body.password,
        identity: req.body.identity
      });
//使用加密 10级 salt回调函数 hash就是加密后的密码啦
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))//成功就把密码返回给user
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//   返回token jwt passport
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库 得到email password 
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在!');
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity
        };
        //规则，加密名字，过期时间1个小时，箭头函数
        jwt.sign(rule,'secret', { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
        // res.json({msg:"success"});
      } else {
        return res.status(400).json('密码错误!');
      }
    });
  });
});
// 返回当前用户想要请求的信息 必须带着令牌有token值才能返回
//使用passport，用passport.authenticate的方法来验证jwt
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity,
      avatar: req.user.avatar,
    });
  }//返回给用户除了password的其他信息
);
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.find()
      .then(users => {
        if (!users) {
          errors.noprofile = '没有任何用户信息';
          return res.status(404).json(errors);
        }
        const newUsers = [];
        for (let i = 0; i < users.length; i++) {
          let usersObj = {};
          usersObj = {
            name: users[i].name,
            _id: users[i]._id,
            email: users[i].email,
            avatar: users[i].avatar,
            date: users[i].date
          };
          newUsers.push(usersObj);
        }

        res.json(newUsers);
      })
      .catch(err => res.status(404).json({ users: '没有任何用户信息' }));
  }
);
//    获取所有信息


router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find()
      .then(user => {
        if (!user) {
          return res.status(404).json('没有任何内容');
        }

        res.json(user);
      })
      .catch(err => res.status(404).json(err));
  }
);
//  删除信息接口

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.params.id })
      .then(user => {
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json('删除失败!'));
  }
);

module.exports = router;
//token是为了获取数据的一个令牌，只有拿到这令牌之后你才能拿到你想要请求的一个数据
//而passport是为了验证token的