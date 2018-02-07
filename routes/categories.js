var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var categoriesSchema = mongoose.Schema({
  title:{
      type:String,
      required: true
  },
  description:String,
  slug:{
      type:String,
      required:true
    }
});
var categoriesModel = mongoose.model('Categories', categoriesSchema);

router.post('/create', function(req, res, next) {
    var newValue = new categoriesModel(req.body);

    newValue.save(function(err , addSuccess){
        console.log(err);
        if(err) {
            return res.send({
                ok:false,
                messsage:"title , slug required"
            });
        }
        res.send({
            ok:true,
            message:"add success"
        });
    });
});

router.get("/list" , function(req , res ,next){
    categoriesModel.find( function(err , resData){
        if(err) {
            return res.send({
                ok:false,
                messsage:"đéo lấy đc data"
            });
        }
        res.send(resData);
    })
});

router.get("/detail/:id" , function(req ,res , next){
    categoriesModel.findById(req.params.id, function(err , resData){
        if(err) {
            return res.send({
                ok:false,
                messsage:"sai cái gì rồi bố"
            });
        }
        res.send(resData);
    });
});

router.get("/delete/:id" , function(req ,res , next){
    categoriesModel.findByIdAndRemove(req.params.id, function(err , resData){
        if(err) {
            return res.send({
                ok:false,
                messsage:"sai cái gì rồi bố"
            });
        }
        res.send(resData);
    });
});

router.post("/update" , function(req,res,next){
    categoriesModel.findByIdAndUpdate( req.body.id , {
        $set:{
            title: req.body.title,
            description: req.body.description,
            slug:req.body.slug
        }
    },{
        new:true
    },function(err , resData){
        if(err) {
            return res.send({
                ok:false,
                messsage:"sai cái gì rồi bố"
            });
        }
        res.send(resData); 
    })
});



module.exports = router;
