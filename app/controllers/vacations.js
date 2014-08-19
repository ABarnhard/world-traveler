'use strict';

var Vacation = require('../models/vacation'),
    moment   = require('moment');

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
    res.render('vacations/index', {vacations:vacations, momentjs:moment});
  });
};

exports.show = function(req, res){
  // console.log(req.body);
  Vacation.findById(req.params.id, function(err, v){
    res.render('vacations/show', {vacation:v, moment:moment});
  });
};

exports.addPhoto = function(req, res){
  Vacation.findById(req.params.id, function(err, v){
    v.addPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};
