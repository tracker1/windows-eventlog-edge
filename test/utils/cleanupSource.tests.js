'use strict';

var expect = require('chai').expect;
var pq = require('proxyquire').noPreserveCache();

describe('cleanupSource', function(){
  var sut = require('../../src/utils/cleanupSource')
      ,parent;

  beforeEach(function(){
    parent = {id:__filename,filename:__filename};
  });

  it('will return the passed in source as a string', function(){
    var input = { source: 123 };
    sut(parent,input);
    expect(input.source).to.equal("123");
  });

  it('will use explicit values when required from repl', function(){
    parent.id = 'repl';
    parent.filename = 'repl';
    var input = {};
    sut(parent, input);
    expect(input.source).to.equal('node.exe');
    expect(input.log).to.equal('Application');
  });

  it('will use the parent module\'s filename as a fallback', function(){
    parent.id="test";
    parent.filename="test_file";
    var input = {};
    sut(parent, input);
    expect(input.source).to.equal("test_file");
    expect(input.log).to.equal('Application');
  });


});