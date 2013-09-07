var Waterline = require('waterline'),
    Model = require('../support/crud.fixture'),
    assert = require('assert');

describe('Queryable Interface', function() {

  /////////////////////////////////////////////////////
  // TEST SETUP
  ////////////////////////////////////////////////////

  var User;

  before(function(done) {
    var waterline = new Waterline();
    waterline.loadCollection(Model);

    Events.emit('fixture', Model);

    waterline.initialize({ adapters: { test: Adapter }}, function(err, colls) {
      if(err) return done(err);
      User = colls.user;
      done();
    });
  });

  describe('Modifiers', function() {

    describe('integers', function() {

      describe('lessThan (<)', function() {

        /////////////////////////////////////////////////////
        // TEST SETUP
        ////////////////////////////////////////////////////

        var testName = 'lessThan test';

        before(function(done) {
          var users = [];

          for(var i=40; i<44; i++) {
            users.push({ first_name: testName, age: i });
          }

          User.createEach(users, function(err) {
            if(err) return done(err);
            done();
          });
        });

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return records with lessThan key', function(done) {
          User.find({ first_name: testName, age: { lessThan: 42 }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 2);
            assert(users[0].age === 40);
            done();
          });
        });

        it('should return records with symbolic usage < usage', function(done) {
          User.find({ first_name: testName, age: { '<': 42 }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 2);
            assert(users[0].age === 40);
            done();
          });
        });
      });

      describe('dates', function() {

        /////////////////////////////////////////////////////
        // TEST SETUP
        ////////////////////////////////////////////////////

        var testName = 'lessThan dates test';

        before(function(done) {
          // Insert 10 Users
          var users = [],
              date;

          for(var i=0; i<10; i++) {
            date = new Date(2013,10,1);
            date.setDate(date.getDate() + i);

            users.push({
              first_name: 'lessThan_dates_user' + i,
              type: testName,
              dob: date
            });
          }

          User.createEach(users, function(err, users) {
            if(err) return done(err);
            done();
          });
        });

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return records with lessThan key when searching dates', function(done) {
          User.find({ type: testName, dob: { lessThan: new Date(2013, 10, 2) }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 1);
            assert(users[0].first_name === 'lessThan_dates_user0');
            done();
          });
        });

        it('should return records with symbolic usage < usage when searching dates', function(done) {
          User.find({ type: testName, dob: { '<': new Date(2013, 10, 2) }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 1);
            assert(users[0].first_name === 'lessThan_dates_user0');
            done();
          });
        });

      });
    });

    describe('lessThanOrEqual (<=)', function() {

      describe('integers', function() {

        /////////////////////////////////////////////////////
        // TEST SETUP
        ////////////////////////////////////////////////////

        var testName = 'lessThanOrEqual test';

        before(function(done) {
          var users = [];

          for(var i=40; i<44; i++) {
            users.push({ first_name: testName, age: i });
          }

          User.createEach(users, function(err) {
            if(err) return done(err);
            done();
          });
        });

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return records with lessThanOrEqual key', function(done) {
          User.find({ first_name: testName, age: { lessThanOrEqual: 42 }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 3);
            assert(users[0].age === 40);
            done();
          });
        });

        it('should return records with symbolic usage <= usage', function(done) {
          User.find({ first_name: testName, age: { '<=': 42 }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 3);
            assert(users[0].age === 40);
            done();
          });
        });
      });

      describe('dates', function() {

        /////////////////////////////////////////////////////
        // TEST SETUP
        ////////////////////////////////////////////////////

        var testName = 'lessThanOrEqual dates test';

        before(function(done) {
          // Insert 10 Users
          var users = [],
              date;

          for(var i=0; i<10; i++) {
            date = new Date(2013,10,1);
            date.setDate(date.getDate() + i);

            users.push({
              first_name: 'lessThanOrEqual_dates_user' + i,
              type: testName,
              dob: date
            });
          }

          User.createEach(users, function(err, users) {
            if(err) return done(err);
            done();
          });
        });

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return records with lessThanOrEqual key when searching dates', function(done) {
          User.find({ type: testName, dob: { lessThanOrEqual: new Date(2013, 10, 2) }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 2);
            assert(users[1].first_name === 'lessThanOrEqual_dates_user1');
            done();
          });
        });

        it('should return records with symbolic usage <= usage when searching dates', function(done) {
          User.find({ type: testName, dob: { '<=': new Date(2013, 10, 2) }}, function(err, users) {
            assert(!err);
            assert(Array.isArray(users));
            assert(users.length === 2);
            assert(users[1].first_name === 'lessThanOrEqual_dates_user1');
            done();
          });
        });

      });
    });

  });
});
