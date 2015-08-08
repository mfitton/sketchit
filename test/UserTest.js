var assert = require('assert');
var User = require('../app/User.js');


describe('User', function() {
  describe('#foo', function () {
    it('should return the string hello world when called', function () {
      var user = new User('my id');
      assert(user.foo() === 'hello world');
    });
  });
});