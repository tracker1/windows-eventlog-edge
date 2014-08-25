'use strict';

var expect = require('chai').expect;

describe('cleanupSource', function(){
  var sut, mod;

  beforeEach(function(){
    var module = mod = {parent:{id:__filename,filename:__filename}};
    sut = eval('(' + require('../../src/utils/cleanupSource').toString() + ')');
  });

  it('will return the passed in source as a string', function(){
    var input = { source: 123 };
    sut(input);
    expect(input.source).to.equal("123");
  });

  it('will use explicit values when required from repl', function(){
    mod.parent.id = 'repl';
    mod.parent.filename = 'repl';
    var input = {};
    sut(input);
    expect(input.source).to.equal('node.exe');
    expect(input.log).to.equal('Application');
  });

  it('will use the parent module\'s filename as a fallback', function(){
    mod.parent.id="test";
    mod.parent.filename="test_file";
    var input = {};
    sut(input);
    expect(input.source).to.equal("test_file");
    expect(input.log).to.equal('Application');
  });


});