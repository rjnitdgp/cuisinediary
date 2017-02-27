//All middleware goes here!!

var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");



var middlewareObj = {};

middlewareObj.checkRestaurantOwnership = function(req, res, next){
   
   if(req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                req.flash("error", "Restaurant not found");
                res.redirect("back");
            } else {
                
                if(foundRestaurant.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to Log in first");
        res.redirect("back");
    } 
    
}



middlewareObj.checkCommentOwnership = function(req, res, next){
    
   if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission Denied-you are not the owner post!");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to be loggedIn first");
        res.redirect("back");
    } 
    
}

//MiddleWare for handling viewing of pages
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error", "You need to be loggedIn to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;