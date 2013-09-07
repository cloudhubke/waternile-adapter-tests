var Waterline = require('waterline'),
    Model = require('./support/crud.fixture'),
    assert = require('assert');

describe('Migratable Interface', function() {

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

  describe('definitions', function() {

    describe('autoCreatedAt', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should be on by default', function() {
        assert(User.autoCreatedAt);
      });

      it('should cause new schema to have a createdAt attribute', function(done) {
        User.describe(function (err, user) {
          assert(!err);
          assert(user.createdAt);
          done();
        });
      });
    });

    describe('autoUpdatedAt', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should be on by default', function() {
        assert(User.autoUpdatedAt);
      });

      it('should cause new schema to have an updatedAt attribute', function(done) {
        User.describe(function (err, user) {
          assert(!err);
          assert(user.updatedAt);
          done();
        });
      });
    });

    describe('autoPK', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should be set to use id by default', function() {
        assert(User.autoPK);
      });

      it('should cause new schema to have an id attribute', function(done) {
        User.describe(function (err, user) {
          assert(!err);
          assert(user.id);
          done();
        });
      });
    });

  });
});
