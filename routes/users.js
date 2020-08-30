const express = require('express');
const router = express.Router();
const path = require("path");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); 
const passport = require('passport');
var isAdmin = false;

//Login page
router.get('/login', (req, res)=>{
    res.render("login.ejs");
})

//Register page
router.get('/register', (req, res)=>{
    res.render("register.ejs");
})

//Register handle
router.post('/register', (req, res) => {
  const name = req.body.nombre;
  const email = req.body.mail;
  const plate = req.body.mat;
  const major = req.body.carrera;
  const password = req.body.password;
  const password2 = req.body.password2;
  let errors = [];

  if (!name || !email || !plate || !major || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (plate.length < 9) {
    errors.push({ msg: 'Plate must include A or LC' });
  }

  if (plate.length == 10){
  	isAdmin = true;
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      plate,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          plate,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          plate,
          major,
          password,
          isAdmin
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Ya estas registrado puedes acceder'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports=router;