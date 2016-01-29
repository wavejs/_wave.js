var assert = require('assert');
var wave = require('..');

describe('Basic 단위 테스트', function () {
  it('문자열 또는 배열 길이 테스트', function () {
    var len = wave.size('STRING');

    assert.equal(len, 6, '맙소사..길이가 틀리네요!!');
  });
});