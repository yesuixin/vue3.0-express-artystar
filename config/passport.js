const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
//这个passport就是刚刚传递过来的
module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
   //验证已经成功了就去查询用户
    User.findById(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null,user);
          }//检查user存在就返回回去

          return done(null,false);
        })
        .catch(err => console.log(err));
  }));
}