var assert = require('assert');
var _ = require('@sailshq/lodash');

describe('Queryable Interface', function() {
  describe('Modifiers', function() {
    describe('contains', function() {
      describe('full where criteria', function() {
        it('should return the user with the correct name', function(done) {
          var part = 'long_xx3ah4aj8xrxh!!!r';
          var testName = 'long_xx3ah4aj8xrxh!!!r contains query test';

          Queryable.Userforqueryableinterface.create(
            { first_name: testName },
            function(err) {
              if (err) {
                return done(err);
              }

              Queryable.Userforqueryableinterface.find(
                { first_name: { $like: `%${part}%` } },
                function(err, users) {
                  if (err) {
                    return done(err);
                  }

                  assert(_.isArray(users));
                  assert.equal(users.length, 1);
                  assert.equal(users[0].first_name, testName);

                  return done();
                }
              );
            }
          );
        });
      });
    });
  });
});
