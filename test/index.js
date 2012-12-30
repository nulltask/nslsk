
var net = require('net');
var expect = require('expect.js');
var utils = require('../lib/utils');

describe('Message', function() {
  
});

describe('utils', function() {
  it('.md5()', function() {
    expect(utils.md5('今夜が山田')).to.eql('e7ba74bdce743e6ea919fbe88b441e13');
  });
});