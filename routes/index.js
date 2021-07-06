var express=require("express");
var router=express.Router();
var user=require("../models/user");
var passport=require("passport") 
router.get("/signup",inlogged,function(req,res){
    res.render("signup");
})
router.post("/signup",inlogged,function(req,res){
    var newUser=new user({username:req.body.username})
    user.register(newUser,req.body.password,function(err,sign){
        if(err){
            console.log(err)
            res.render("signup")
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/animals")
            })
        }
    })
})
//login
router.get("/login",inlogged,function(req,res){
    res.render("login");
})
router.post("/login",inlogged,passport.authenticate("local",{
    successRedirect:"/animals",
    failureRedirect:"/login"
}),function(){

});
//logout
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/animals");
})
function logged(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function inlogged(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/animals");
    }
    return next();
}
module.exports=router;