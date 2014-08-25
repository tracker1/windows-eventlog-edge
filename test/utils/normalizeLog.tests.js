'use strict';

var expect = require('chai').expect;

describe('normalizeLog', function(){
  var sut = require('../../src/utils/normalizeLog');

  it('will default to "Application" log', function(){
    expect(sut()).to.equal("Application");
  });


  it('will return "Security" for a string beginning with "sec"', function(){
    expect(sut("SEC")).to.equal("Security");
  });


  it('will return "Setup" for a string beginning with "set"', function(){
    expect(sut("SET")).to.equal("Setup");
  });


  it('will return "System" for a string beginning with "sys"', function(){
    expect(sut("SYS")).to.equal("System");
  });


  it('will return "Forwarded Events" for a string beginning with "for"', function(){
    expect(sut("FOR")).to.equal("Forwarded Events");
  });

});