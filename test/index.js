var assert = require('assert');
var wave = require('..');

describe('Basic', function () {
  it('test 1', function () {
    var len = wave.size('STRING');

    assert.equal(len, 6, 'what the..');
  });
});