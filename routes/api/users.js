const express = require('express');
const router = express.Router();
const user = require('../../moduls/User');

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
   }
 })
 .catch(err => console.log(err)); 
})


module.exports =router;