const Jwtstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoos = require(mongoos);
const user= mongoose.model('users');
const Keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearertoken();
opts.secretOrkey = keys.secretOrkey;

module. exports = passport =>{
  pessport.use(
    new Jwtstrategy(opts, (paylod, done) =>{console.log(payload);
    })
  )
}