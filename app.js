var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    Restaurant  = require("./models/restaurant"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    //Authentication installations=========
    passport    = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    localStrategy = require("passport-local");
 
var commentRoutes    = require("./routes/comments"),
    restaurantRoutes = require("./routes/restaurants"),
    authRoutes       = require("./routes/auth");

var url = process.env.DATABASEURL || "mongodb://localhost/restaurant_db"

console.log(url);
//mongoose.connect("mongodb://raj:mota@ds023468.mlab.com:23468/restaurant_db");
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Application Secret Token",
    resave: false, 
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
//To add the current login, signup, logout links automatically, send data to every template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(authRoutes);
app.use(restaurantRoutes);
app.use(commentRoutes);

//seedDB();
//ROUTES
//HOMEPAGE
app.get("/", function(req, res){
    
    res.render("landing");
    
})


//SERVER START at PORT
app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("Cuisine Diary Server Started...");
})