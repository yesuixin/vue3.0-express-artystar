/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-10-31 10:01:07
 * @,@LastEditTime: ,: 2021-01-28 17:14:17
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var mongoose =require('mongoose');
var URL = 'mongodb://localhost:27017/art';



mongoose.connect(URL,function(err){
    if(err){
        console.warn('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+URL);
    }
}, {useNewUrlParser: true});


const users = require('./routes/users');
const index = require('./routes/index');
const moment = require('./routes/moment');
const chat = require('./routes/chat');
const party = require('./routes/party');
const card = require('./routes/card');
const address = require('./routes/address');
const collect = require('./routes/collect');
const comment = require('./routes/comment');

const bodyParser =require('body-parser');//接受前端post请求

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// passport 初始化 还有把passport传递过去
app.use(passport.initialize());
require('./config/passport')(passport);
//用中间件使用user
app.use('/users', users);
app.use('/index', index); 
app.use('/moment', moment);
app.use('/chat', chat);
app.use('/party', party);
app.use('/card', card);
app.use('/address', address);
app.use('/collect', collect);
app.use('/comment', comment);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
  
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;
