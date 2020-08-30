const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

//DB Config
const db = require("./config/keys").MongoURI;

//Passport Config
require("./config/passport")(passport);

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser:true })
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('views'));
//app.set('views', '/views');

//JSON
app.use(express.json());

//Body Parser
app.use(express.urlencoded({ extended:false }));

//Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error)=>{
    console.log("Server running...");
})