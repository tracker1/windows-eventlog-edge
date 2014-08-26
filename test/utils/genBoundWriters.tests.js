'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();

describe('genBoundWriters', function(){

  it('will generate the expected response', function(){
    var shims = {
      info: sinon.stub(),
      warn: sinon.stub(),
      error: sinon.stub(),
      success: sinon.stub(),
      failure: sinon.stub()
    };

    var genWriter = sinon.stub();
    genWriter.withArgs('Application','test','Information').returns(shims.info);
    genWriter.withArgs('Application','test','Warning').returns(shims.warn);
    genWriter.withArgs('Application','test','Error').returns(shims.error);
    genWriter.withArgs('Application','test','SuccessAudit').returns(shims.success);
    genWriter.withArgs('Application','test','FailureAudit').returns(shims.failure);
    
    var sut = pr('../../src/utils/genBoundWriters', {
      './genWriter':genWriter
    });

    var result = sut('Application','test');
    expect(result).to.have.property('info',shims.info);
    expect(result).to.have.property('warn',shims.warn);
    expect(result).to.have.property('error',shims.error);
    expect(result).to.have.property('success',shims.success);
    expect(result).to.have.property('failure',shims.failure);
  });

});