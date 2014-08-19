/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation  = require('../../app/models/vacation'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'world-traveler-test',
    o,
    v;

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      // console.log(stdout, stderr);
      o = {lat:'37.688889',lng:'-97.33611100000002',name:'Wichita, KS, USA',from:'2014-10-01',to:'2014-10-11'},
      v = new Vacation(o);
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new Vacation object', function(){
      expect(v).to.be.instanceof(Vacation);
      expect(v.name).to.equal('Wichita, KS, USA');
      expect(v.lat).to.be.closeTo(37.688889, 0.01);
      expect(v.lng).to.be.closeTo(-97.33611100000002, 0.01);
      expect(v.startDate).to.respondTo('getDate');
      expect(v.endDate).to.respondTo('getDate');
      expect(v.photos).to.have.length(0);
    });
  });

  describe('.all', function(){
    it('should get all vacations', function(done){
      Vacation.all(function(err, vacations){
        expect(vacations).to.have.length(3);
        done();
      });
    });
  });

  describe('.save', function(){
    it('should save a new vacation to the database', function(done){
      Vacation.save(o, function(vacation){
        expect(vacation._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

});

