var Waterline = require('../../lib/waterline'),
    assert = require('assert');

describe('Waterline Collection', function() {

  describe('validations', function() {
    var User;

    before(function(done) {

      // Extend for testing purposes
      var Model = Waterline.Collection.extend({
        identity: 'user',
        adapter: 'foo',
        attributes: {
          name: {
            type: 'string',
            required: true
          },

          email: {
            type: 'email'
          }
        }
      });

      // Fixture Adapter Def
      var adapterDef = { create: function(col, values, cb) { return cb(null, values); }};
      new Model({ adapters: { foo: adapterDef }}, function(err, coll) {
        if(err) done(err);
        User = coll;
        done();
      });
    });

    it('should work with valid data', function(done) {
      User.create({ name: 'foo bar', email: 'foobar@gmail.com'}, function(err, user) {
        assert(!err);
        done();
      });
    });

    it('should error with invalid data', function(done) {
      User.create({ name: '', email: 'foobar@gmail.com'}, function(err, user) {
        assert(!user);
        assert(err.name[0].rule === 'required');
        done();
      });
    });

  });
});
