var express=require("express");
var router=express.Router({mergeParams:true});
var animal=require("../models/animals");
var comment=require("../models/comments");
var middleware=require("../middleware")

router.get("/new",middleware.logged,function(req,res){
    animal.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err)
        }
        else{
            res.render("comments/new",{comn:ans});
        }
    })
})
router.post("/",middleware.logged,function(req,res){
    animal.findById(req.params.id,function(err,ans){
        if(err){
            console.log(err)
        }
        else{
    var result=req.body.comm;
    comment.create(result,function(err,done){
        if(err){
            console.log(err)
        }
        else{
            console.log("done")
            done.author.id=req.user._id;
            done.author.username=req.user.username;
            console.log(done.author.id);
            console.log(done.author.username);
            done.save();
            ans.comments.push(done);
            ans.save();
            res.redirect("/animals/"+ans._id)
        }
    })
}
})
})
//edit
router.get("/:comment_id/edit",middleware.checkcomment,function(req,res){
    comment.findById(req.params.comment_id,function(err,found){
        if(err){
            console.log(err)
        }
        else{
            res.render("comments/edit",{animalid:req.params.id,comn:found})
        }
    })
})
//update
router.put("/:comment_id",middleware.checkcomment,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comm,function(err,found){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/animals/"+req.params.id)
        }
    })
})
//delete
router.delete("/:comment_id",middleware.checkcomment,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err,done){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/animals/"+req.params.id)
        }
    })
})

module.exports=router;