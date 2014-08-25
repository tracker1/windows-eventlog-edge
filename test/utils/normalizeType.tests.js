'use strict';

var _ = require('lodash');
var expect = require('chai').expect;

describe('normalizeType', function(){
  var sut = require('../../src/utils/normalizeType');

  it('will return "Information" by default', function(){
    expect(sut()).to.equal("Information");
  });


  it('will return "Error" for strings that begin with "e"', function(){
    expect(sut("E")).to.equal("Error");
  });


  it('will return "Warning" for strings that begin with "w"', function(){
    expect(sut("W")).to.equal("Warning");
  });


  it('will return "SuccessAudit" for strings that begin with "s"', function(){
    expect(sut("S")).to.equal("SuccessAudit");
  });


  it('will return "FailureAudit" for strings that begin with "f"', function(){
    expect(sut("F")).to.equal("FailureAudit");
  });

});