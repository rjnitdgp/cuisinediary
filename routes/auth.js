var express = require("express");
var router = express.Router();

var User = require("../models/user");

var passport = require("passport");


//AUTH ROUTES===============
//Show register form
router.get("/register", function(req, res) {
    res.render("register");
})

//Handle User registration Logic!
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user){
    if(err){
        console.log(err);
        req.flash("error", err.message);
        res.redirect("/register");
    } 
        
    passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect("/campgrounds"); 
    
        });
    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login");
})

//Handle User Login here
router.post("/login", passport.authenticate("local", 
    {successRedirect: "/campgrounds",
     failureRedirect: "/login"    
}), function(req, res) {
    
});

//Handle Logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out Sucessfully");
    res.redirect("/campgrounds");
})


//MiddleWare for handling viewing of pages
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;