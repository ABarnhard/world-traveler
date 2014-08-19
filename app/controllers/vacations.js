'use strict';

var Vacation = require('../models/vacation'),
    moment   = require('moment'),
    mp       = require('multiparty');

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

exports.downloadPhoto = function(req, res){
  Vacation.findById(req.params.id, function(err, v){
    v.downloadPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};

exports.uploadPhotos = function(req, res){
  Vacation.findById(req.params.id, function(err, v){
    var form = new mp.Form();
    form.parse(req, function(err, fields, files){
      v.uploadPhotos(files, function(){
        res.redirect('/vacations/' + req.params.id);
      });
    });
  });
};
