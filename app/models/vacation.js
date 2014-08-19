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

module.exports = Vacation;

