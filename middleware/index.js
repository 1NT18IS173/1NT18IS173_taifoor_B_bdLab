var comment=require("../models/comments");
var animal=require("../models/animals");
var middlewareObj={};
middlewareObj.logged = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
middlewareObj.inlogged= function (req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/animals");
    }
    return next();
}
//to  check if user is logged in and the author can only edit or delete the comment
middlewareObj.checkcomment=function (req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,found){
            if(err){
                console.log(err)
            }
            else{
                if(found.author.id.equals(req.user._id)){
                    return next();
                }
                else{
                    return res.redirect("back")
                }
            }
        })
    }
    else{
        return res.redirect("back");
    }
}
//to  check if user is logged in and the author can only edit or delete the animal
middlewareObj.check= function (req,res,next){
    if(req.isAuthenticated()){
        animal.findById(req.params.id,function(err,found){
            if(err){
                console.log(err)
            }
            else{
                if(found.author.id.equals(req.user._id)){
                    return next();
                }
                else{
                    return res.redirect("back")
                }
            }
        })
    }
    else{
        return res.redirect("back");
    }
}
module.exports=middlewareObj;