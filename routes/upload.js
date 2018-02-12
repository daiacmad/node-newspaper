var express = require('express');
var router = express.Router();
var multer  = require('multer');

var upload = multer({dest: "./public/uploads"}).single('photo');


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
       path = req.file.path;
       console.log(req.file)
       return res.send({
           ok:true,
           url:path
        }); 
 });     
})


module.exports = router;
