'use strict';

var Vacation = require('../models/vacation');

exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  // console.log(req.body);
  Vacation.save(req.body, function(){
    res.redirect('/vacations');
  });
};

exports.index = function(req, res){
  Vacation.all(function(err, vacations){
    // console.log(vacations);
    res.render('vacations/index', {vacations:vacations});
  });
};

