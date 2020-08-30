const express = require('express');
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const Lockerdb = require("../models/Locker");
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Welcome page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome.ejs'));

//Account page
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin
  })
);

// account view
router.get('/account', ensureAuthenticated, (req, res) =>
  res.render('account.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin,
    oscilloscope: req.user.oscilloscope,
    fgenerator: req.user.fgenerator,
    multimeter: req.user.multimeter,
    font: req.user.font
  })
);

// lockers view
router.get('/lockers', ensureAuthenticated, (req, res) =>
  res.render('lockers.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin,
    locker: req.user.locker
  })
);

// locker post function
function locker(a){
	Lockerdb.findOne({isAvailable: true}, function(err,obj) {
  	var x=obj.idl;
  	User.findOneAndUpdate({plate:a}, {locker:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  	Lockerdb.findOneAndUpdate({idl:x}, {isAvailable:false}, (err)=>{
  		if(err){
  		throw Error(error);
  	}
  	});
  	Lockerdb.findOneAndUpdate({idl:x}, {who:a}, (err)=>{
  		if(err){
  		throw Error(error);
  	}
  	});
  });
}

// lockers post
router.post('/lockers', ensureAuthenticated, (req, res) =>
  res.render('lockers.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin,
    locker: req.user.locker
  }, locker(req.user.plate))
);

// admin post function
function admin(d3){
  var d32=d3.split(" ");
  if(d32[1]==="recibe"){
  	if(d32[2]==="osciloscopio"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x=obj.oscilloscope+1;
  	User.findOneAndUpdate({plate:d32[0]}, {oscilloscope:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="generador"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x=obj.fgenerator+1;
  	User.findOneAndUpdate({plate:d32[0]}, {fgenerator:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="multimetro"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x=obj.multimeter+1;
  	User.findOneAndUpdate({plate:d32[0]}, {multimeter:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="fuente"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x=obj.font+1;
  	User.findOneAndUpdate({plate:d32[0]}, {font:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  }
  else if(d32[1]==="entrega"){
  	if(d32[2]==="osciloscopio"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x
  	 	if(obj.oscilloscope==0){
  	 		x=0
  	 	}
  	 	else{
  	 		x=obj.oscilloscope-1;
  	 	}
  	User.findOneAndUpdate({plate:d32[0]}, {oscilloscope:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="generador"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x
  	 	if(obj.fgenerator==0){
  	 		x=0
  	 	}
  	 	else{
  	 		x=obj.fgenerator-1;
  	 	}
  	User.findOneAndUpdate({plate:d32[0]}, {fgenerator:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="multimetro"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	var x
  	 	if(obj.multimeter==0){
  	 		x=0
  	 	}
  	 	else{
  	 		x=obj.multimeter-1;
  	 	}
  	User.findOneAndUpdate({plate:d32[0]}, {multimeter:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="fuente"){
  	 User.findOne({plate: d32[0]}, function(err,obj) {
  	 	var x
  	 	if(obj.font==0){
  	 		x=0
  	 	}
  	 	else{
  	 		x=obj.font-1;
  	 	}
  	User.findOneAndUpdate({plate:d32[0]}, {font:x}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  }); 
  }
  if(d32[2]==="locker"){
  	Lockerdb.findOne({who: d32[0]}, function(err,obj) {
  	if(!obj){
  		console.log("no tiene locker")
  	}
  	else{
  		var x=obj.idl;
  	User.findOneAndUpdate({plate:d32[0]}, {locker:0}, (err)=>{
  	if(err){
  		throw Error(error);
  	}
  });
  	Lockerdb.findOneAndUpdate({idl:x}, {isAvailable:true}, (err)=>{
  		if(err){
  		throw Error(error);
  	}
  	});
  	Lockerdb.findOneAndUpdate({idl:x}, {who:""}, (err)=>{
  		if(err){
  		throw Error(error);
  	}
  	});
  	}
  });
  }
  }
}

// admin post
router.post('/admin', ensureAuthenticated, (req, res) =>
  res.render('admin.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin,
  }, admin(req.body.info))
);

// locker rental

//router.post('/lockers', ensureAuthenticated, (req, res) =>{
 /* const isAvailable = true;
  for (let idl = 101; idl < 117; idl++) {
    Locker.findOne({ isAvailable: isAvailable }).then
  }*/

//const available = Locker.findOne({isAvailable:true});
//res.render('lockers.ejs');
// Revisar si hubo respuesta
/*
if (!available){
  // Regresar mensaje
  // ******
}
else {
  const idLocker = available.idl;
  Lockerdb.update({idl:idLocker}, {
    who: req.user.name,
    isAvailable: false
  })
  //actualizar este locker
  //User.update({})
}
*/
//});

// donations view
router.get('/donations', ensureAuthenticated, (req, res) =>
  res.render('donations.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin
  })
);

// reservations view
router.get('/reservations', ensureAuthenticated, (req, res) =>
  res.render('reservations.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin
  })
);

// admin view
router.get('/admin', ensureAuthenticated, (req, res) =>
  res.render('admin.ejs', {
    name: req.user.name,
    isAdmin: req.user.isAdmin
  })
);

module.exports = router;