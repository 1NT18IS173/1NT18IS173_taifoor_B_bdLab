var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport=require("passport"),
    methodOverride=require("method-override");
    passportLocalMongoose=require("passport-local-mongoose"),
    localStratergy=require("passport-local"),
    session=require("express-session");
var animalRoutes=require("./routes/animals");    
var commentRoutes=require("./routes/comments");    
var indexRoutes=require("./routes/index");    
mongoose.connect("mongodb://localhost/animals_app9", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
var animal = require("./models/animals")
var comment = require("./models/comments")
var user = require("./models/user")
// var seeddb = require("./seed")
app.use(session({
    secret: "authentication",
    resave: true,
    saveUninitialized: false
  }))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())
app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    next();
})
app.use("/animals",animalRoutes);
app.use("/animals/:id/comments",commentRoutes);
app.use("/",indexRoutes);
//seeddb(); not calling cause i dont want to remove
app.get("/", function (req, res) {
    res.render("animals/home");
})
//signup
app.listen(3000, function () {
    console.log("Started");
})