var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var articlesSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    content:String,
    categories:[String],
    tags:[String],
    createdAt:String,
    updatedAt:String,
});
var articlesModel = mongoose.model('Articles', articlesSchema);

router.post('/create', function(req, res, next) {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();

    var newValue = new articlesModel(req.body);

    newValue.save(function(err , addSuccess){
        console.log(err);
        if(err) {
            return res.send({
                ok:false,
                data:err
            });
        }
        res.send({
            ok:true,
            data:addSuccess
        });
    });
});

router.get("/list" , function(req , res ,next){
    articlesModel.find( function(err , resData){
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
    articlesModel.findById(req.params.id, function(err , resData){
        if(err) {
            return res.send({
                ok:false,
                data:err
            });
        }
        res.send({
            ok:true,
            data:resData
        });
    });
});

router.get("/delete/:id" , function(req ,res , next){
    articlesModel.findByIdAndRemove(req.params.id, function(err , resData){
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
    articlesModel.findByIdAndUpdate( req.body.id , {
        $set:{
            title: req.body.title,
            slug: req.body.slug,
            thumbnail: req.body.thumbnail,
            content: req.body.content,
            categories: req.body.categories,
            tags: req.body.tags,
            updatedAt: Date.now(),
        }
    },{
        new:true
    },function(err , resData){
        if(err) {
            return res.send({
                ok:false,
                data :err
            });
        }
        res.send({
            ok:true,
            data:resData
        }); 
    })
});



module.exports = router;
