var express = require('express');
var router = express.Router();
var multer  = require('multer');
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
    
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split(".")[file.originalname.split(".").length - 1]);
      });
    }
  });
  var upload = multer({ storage: storage }).single('uploadfile');


router.post('/', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
        console.log(err);
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       path = req.file.filename;
       
       return res.send({
           ok:true,
           url:"/uploads/" + path
        }); 
 });     
})


module.exports = router;
