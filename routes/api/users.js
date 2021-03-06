const express = require('express');
const router = express.Router();
const user = require('../../moduls/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Jwt = require(),
const Keys = require('../..config/keys');
const passport = require('passport')
// @route  POST api/users
// @desc  Register a user
//@access Public
router.post('/register',(req, res)=>{
 user.findOne({email: req.body.email})
 .then(user =>{
   if(user){
     return res.status(400).json({
       email: 'Email already exists'
     })
   } else {
    const avatar = gravatar.url(req.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    const newUser = new user({
     name: req.body.name,
     email: req.body.email,
     avatar,
     password: req.body.password
   });

   bcrypt.genSalt(10, (err, salt) =>{
     if (err) throw err;
     bcrypt.hash(newUser.password, salt, (err,hash) => {
      if (err) throw err;
      newUser.save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
   })
     
     }
    
  )
 .catch(err => console.log(err)); 
}
// @route  POST api/users/login
// @desc  login user/return JWT token
//@access Public
router.post('/login', (req, res) =>{
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  user.findOne({email})
  .then(user =>{
    if (!user){
      return res.status(404).json({
      email: 'User not found'  
    })
    }
    bcrypt.compare(password, user.password)
      .then(isMatch =>{
        if (!isMatch){
          return res.status(400).json({
            password: 'password does not match.' 
          });
        }
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        Jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            if (err)throw err;
            return res.json({
              sucess: true,
              token: 'Bearer'+ token
            })
          }
          )
        
      })
        .catch(err => console.log(err));
      
  })

  .catch(err => console.log(err));
});
// @route  Get api/users/login
// @desc  login user/return JWT token
//@access private
router.get('/current',
passport.authenticate('jwt',{session: false}),
  (req, res) => {
    res.json({msg: 'success'});

});
 
 
module.exports = router;
