/*
 * Module dependencies
 */

var assert = require('assert');
var _ = require('@sailshq/lodash');
var Waterline = require('waternile');
var waterlineUtils = require('waterline-utils');

describe('Migratable Interface', function() {
  describe('migrate: "alter"', function() {
    it('should have the proper migrate setting when bootstrapping', function() {
      assert.equal(Migratable.Alter.migrate, 'alter');
    });

    describe('teardown and migrate existing data', function() {
      before(function(done) {
        Migratable.Alter.create({ name: 'blackbeard\'s ghost' }, done);
      });

      it('should retain the data when bootstrapped the second time', function(done) {
        Migratable.Waterline.teardown(function(err) {
          // Create a new ORM instance
          var wl = new Waterline();

          // Load the fixtures again
          var fixtures = _.cloneDeep(Migratable.fixtures);
          _.each(fixtures, function(val, key) {
            wl.registerModel(Waterline.Collection.extend(_.merge({ archiveModelIdentity: false }, fixtures[key])));
          });

          // Initialize the ORM again
          wl.initialize(Migratable.WaterlineOptions, function(err, orm) {
            if (err) {
              return done(err);
            }

            // Run migrations
            waterlineUtils.autoMigrations('alter', orm, function(err) {
              if (err) {
                return done(err);
              }

              orm.collections.alter.find().exec(function(err, pirates) {
                if (err) {
                  return done(err);
                }

                assert.strictEqual(pirates.length, 1);
                assert.strictEqual(pirates[0].name, 'blackbeard\'s ghost');

                return done();
              });
            });
          });
        });
      });
    });
  });


  describe('migrate: "alter" with custom table and column names', function() {
    it('should have the proper migrate setting when bootstrapping', function() {
      assert.equal(Migratable.Custom.migrate, 'alter');
    });

    describe('teardown and migrate existing data', function() {
      before(function(done) {
        Migratable.Custom.create({ name: 'blackbeard' }, done);
      });

      it('should retain the data when bootstrapped the second time', function(done) {
        Migratable.Waterline.teardown(function(err) {
          // Create a new ORM instance
          var wl = new Waterline();

          // Load the fixtures again
          var fixtures = _.cloneDeep(Migratable.fixtures);
          _.each(fixtures, function(val, key) {
            wl.registerModel(Waterline.Collection.extend(_.merge({ archiveModelIdentity: false }, fixtures[key])));
          });

          // Initialize the ORM again
          wl.initialize(Migratable.WaterlineOptions, function(err, orm) {
            if (err) {
              return done(err);
            }

            // Run migrations
            waterlineUtils.autoMigrations('alter', orm, function(err) {
              if (err) {
                return done(err);
              }

              orm.collections.custom.count().exec(function(err, numOfPirates) {
                if (err) {
                  return done(err);
                }

                assert.strictEqual(numOfPirates, 1);

                return done();
              });
            });
          });
        });
      });
    });
  });
});
