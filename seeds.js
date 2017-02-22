var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "BJ's", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/05/c9/25/94/front.jpg",
        description: "American Cuisine- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Indian Cuisine", 
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/orMvyNOzOEDRLz2n55Y85Q/o.jpg",
        description: "Indian Cuisine- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Chillis", 
        image: "https://activerain-store.s3.amazonaws.com/image_store/uploads/6/4/1/3/5/ar128943173953146.jpg",
        description: "MExican/American Cuisine- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Gator Suyaki", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/05/09/11/d3/road-signage.jpg",
        description: "Chinese Cuisine- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Olive Garden", 
        image: "http://dmielectric.com/uploads/3/0/5/6/3056678/2946956_orig.jpg",
        description: "American Cuisine- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    
    ] 

//To Remove all CampGrounds
function seedDB(){
Comment.remove({}, function(err) {
    if(err){
        console.log(err);
    }
    console.log("Removed Comment/Comments");
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("Removed Campgrounds");
    //To Add a few CampGrounds
    data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log("Added a campground!");
            //create a comment on each campgrouund added!
            
            Comment.create({
                text: "This place is great, but I wish internet was there",
                author: "Mota"    
                    
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new Comment!");
                    }
                    
                    
                })
        }
    })
    
})
}) 
});

};


module.exports = seedDB;