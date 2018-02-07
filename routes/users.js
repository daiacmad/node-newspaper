var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  userName:String,
  password:String
});
var userModel = mongoose.model('Users', userSchema);

router.post('/login', function(req, res, next) {

  userModel.findOne( { "userName" : req.body.userName} ,function(err , resData){

    if(err){
      res.send({
        status:false,
        message:"user or password invalid"
      }); 
    }

    if(resData.password == req.body.password){
      res.send({
        ok:true,
        message:"login success",
        token: "96e79218965eb72c92a549dd5a330112"
      })
    }else{
      res.send({
        status:false,
        message:"user or password invalid"
      }); 
    }
  });
});



module.exports = router;
