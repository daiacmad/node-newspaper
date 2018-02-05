var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    title: String,
    description: String,
    categories: [String],
    tags:[String]
});
var newsModel = mongoose.model('News', newsSchema);


/* GET home page. */
router.get('/getList', function(req, res, next) {
    newsModel.find(function(err , news){
        res.send(news);
    })
});

router.post("/add" , function(req , res , next){
    
    var newValue = new newsModel(req.body);

    newValue.save(function(err , addSuccess){
        if(err) {
            return res.send({
                ok:false,
                messsage:"add failed"
            });
        }
        res.send({
            ok:true,
            message:"add success"
        });
    })
});

router.get("/remove/:id" , function(req , res , next){
    newsModel.findByIdAndRemove(req.params.id ,function(err , resData){

        if(err) return res.send({
            status:false,
            message:"remove failed"
        });

        res.send({
            ok:true,
            message:"remove success"
        })
    });
});

module.exports = router;
