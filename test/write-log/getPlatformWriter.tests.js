'use strict';

var _ = require('lodash');
var assert = require('chai').assert;
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();
var path = require('path');

describe('getPlatformWriter', function(){
  var sut, edge, path, writeToConsole, writeToWindowsEventLog;

  beforeEach(function(){
    writeToWindowsEventLog = function writeToWindowsEventLog(){};
    writeToConsole = function writeToConsole(){};
    
    var edge = { func:sinon.stub() };

    edge.func.returns(writeToWindowsEventLog);

    sut = pr('../../src/write-log/getPlatformWriter',{
      'edge':edge,
      './writeToConsole':writeToConsole
    });
  });

  it('will return a writer by default', function(){
    var fn = sut();
    assert(fn === writeToWindowsEventLog || fn === writeToConsole, 'must return a writer');
  });

  it('will return writeToWindowsEventLog when platform is win*', function(){
    assert(sut('win') === writeToWindowsEventLog, 'return writeToWindowsEventLog for "win"');
  });

  it('will return writeToConsole when platform is not win*', function(){
    assert(sut('other') === writeToConsole, 'return writeToConsole not "win"');
  });

});