var express = require("express")
var router = express.Router();
var animal = require("../models/animals");
var middleware=require("../middleware")
router.get("/", function (req, res) {
    animal.find({}, function (err, anim) {
        if (err) {
            console.log("error");
        }
        else {
            console.log(req.user)
            res.render("animals/index", { data: anim });
        }
    })

})
router.post("/", function (req, res) {
    var info = req.body.name;
    var info1 = req.body.image;
    var info2 = req.body.desc;
    var info3 = {
        username: req.user.username,
        id: req.user._id
    };
    var total = {
        name: info,
        image: info1,
        description: info2,
        author: info3
    };
    animal.create(total, function (err, anima) {
        if (err) {
            console.log("error");
        }
        else {
            res.redirect("/animals");
        }
    })
})
router.get("/new", middleware.logged, function (req, res) {
    res.render("animals/new");
});
router.get("/:id", function (req, res) {
    animal.findById(req.params.id).populate("comments").exec(function (err, all) {
        if (err) {
            console.log("ERROR")
        }
        else {
            console.log("visited show page")
            console.log(all)
            res.render("animals/show", { abc: all });
        }
    });
})
//edit route
router.get("/:id/edit",middleware.check,function(req,res){
    animal.findById(req.params.id,function(err,edit){
        if(err){
            console.log(err)
        }
        else{
            res.render("animals/edit",{edit:edit});
        }
    })
})
//update route
router.put("/:id",middleware.check,function(req,res){
    animal.findByIdAndUpdate(req.params.id,req.body.val,function(err,done){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/animals/"+req.params.id);
        }
    })
})
//delete route
router.delete("/:id",middleware.check,function(req,res){
    animal.findByIdAndRemove(req.params.id,function(err,done){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/animals")
        }
    })
})
module.exports = router;