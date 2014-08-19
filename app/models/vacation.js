'use strict';

var Mongo = require('mongodb');

function Vacation(o){
  this.name = o.name.trim();
  this.startDate = new Date(o.from);
  this.endDate = new Date(o.to);
  this.lat = parseFloat(o.lat);
  this.lng = parseFloat(o.lng);
  this.photos = [];
}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

Vacation.save = function(o, cb){
  var v = new Vacation(o);
  Vacation.collection.save(v, function(){
    cb(v);
  });
};

Vacation.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Vacation.collection.findOne({_id:id}, cb);
};

module.exports = Vacation;
/* Will need later:
Vacation.collection.update({_id:id}, {$set:{balance:a.balance}, $inc:{numTransacts:1}, $push:{transactions:t}}, function(){
  if(cb){cb();}
});
*/
