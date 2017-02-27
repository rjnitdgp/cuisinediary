var express = require("express");
var router = express.Router();

var Restaurant = require("../models/restaurant");

var middleware = require("../middleware");

//CAMPING GROUNDS GET, get all campgrounds
router.get("/restaurants", function(req, res){
        
        Restaurant.find({}, function(err, allRestaurants){
            if(err){
                console.log("Database error in retreiving results");
                console.log(err);
            } else {
                res.render("restaurants/index", {restaurants:allRestaurants});
            }
            
        })
       
})


//CAMPING GROUNDS POST, get data and add to campgrounds
router.post("/restaurants", middleware.isLoggedIn, function(req, res){
    
   var name = req.body.name;
   var image = req.body.image;
   
   var desc = req.body.description;
   
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   
   
   var newRestaurant = {name: name, image: image, description: desc, author:author};
   
  Restaurant.create(newRestaurant, function(err, restaurant){
    if(err){
        console.log("Database error while persisting");
    } else {
        console.log("Persisted new campground to Database");
        console.log(restaurant);
        res.redirect("/restaurants");
    }
})

    
})

router.get("/restaurants/new", middleware.isLoggedIn, function(req, res){
    
    res.render("restaurants/new");
    
})

//SHOW MORE INFO ABOUT A SINGLE CAMPGROUND
router.get("/restaurants/:id", function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        if(err){
            console.log(err);
        } else {
            res.render("restaurants/show", {restaurant:foundRestaurant});
        }
    });
})

//EDIT CAMPGROUND ROUTE
router.get("/restaurants/:id/edit", middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant) {
        res.render("restaurants/edit", {restaurant: foundRestaurant});
    });
});


//UPDATE CAMPGROUND ROUTE
router.put("/restaurants/:id", middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if(err){
            res.redirect("/restaurants");
        } else {
            res.redirect("/restaurants/" + updatedRestaurant._id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/restaurants/:id",middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/restaurants");
        } else {
            res.redirect("/restaurants");
        }
    });
});

module.exports = router;