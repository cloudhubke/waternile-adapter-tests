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

  describe('OR Query Modifier', function() {

    describe('with a record', function() {

      /////////////////////////////////////////////////////
      // TEST SETUP
      ////////////////////////////////////////////////////

      before(function(done) {

        // Insert 3 Users
        var users = [];

        for(var i=0; i<3; i++) {
          users.push({first_name: 'OR_user' + i, type: 'or test'});
        }

        User.createEach(users, function(err, users) {
          if(err) return done(err);
          done();
        });
      });

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should return the correct users', function(done) {
        User.find({ where: { or: [{ first_name: 'OR_user0' }, { first_name: 'OR_user1' }]}})
        .exec(function(err, users) {
          assert(!err);
          assert(users.length === 2);
          assert(users[0].first_name === 'OR_user0');
          assert(users[1].first_name === 'OR_user1');
          done();
        });
      });

      it('should return a model instances', function(done) {
        User.find({ where: { or: [{ first_name: 'OR_user0' }, { first_name: 'OR_user1' }]}})
        .exec(function(err, users) {
          assert(users[0].id);
          assert(typeof users[0].fullName === 'function');
          assert(toString.call(users[0].createdAt) == '[object Date]');
          assert(toString.call(users[0].updatedAt) == '[object Date]');
          done();
        });
      });
    });

    describe('without a record', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should return an empty array', function(done) {
        User.find({ where: { or: [{ first_name: 'OR_user10' }, { first_name: 'OR_user11' }]}})
        .exec(function(err, users) {
          assert(users.length === 0);
          done();
        });
      });
    });

  });
});
