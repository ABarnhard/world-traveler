'use strict';

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

module.exports = Vacation;

