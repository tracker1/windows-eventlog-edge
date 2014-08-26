'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();
var expect = chai.expect;

chai.use(require('sinon-chai'));

describe('windows-eventlog-edge/index', function(){
  var sut, stubs, genBoundWriters, writeLog;

  beforeEach(function(){
    stubs = {
        Application: {},
        Security: {},
        Setup: {},
        System: {},
        ForwardedEvents: {}
    };

    writeLog = sinon.stub();

    genBoundWriters = sinon.stub();
    genBoundWriters.withArgs('Application').returns(stubs.Application);
    genBoundWriters.withArgs('Security').returns(stubs.Security);
    genBoundWriters.withArgs('Setup').returns(stubs.Setup);
    genBoundWriters.withArgs('System').returns(stubs.System);
    genBoundWriters.withArgs('Forwarded Events').returns(stubs.ForwardedEvents);

    sut = pr('../src/index', {
      './write-log': writeLog,
      './utils/genBoundWriters': genBoundWriters
    });

  });

  it('is a functino that will passthrough to write-log', function(){
    var cb = function(){};
    sut('test1',cb);
    expect(writeLog).to.be.calledWithExactly('test1',cb);
  });

  it('will call the expected methods', function(){
    expect(sut.Application()).to.equal(stubs.Application);
    expect(genBoundWriters).to.be.calledWithExactly('Application');

    expect(sut.Security()).to.equal(stubs.Security);
    expect(genBoundWriters).to.be.calledWithExactly('Security');

    expect(sut.Setup()).to.equal(stubs.Setup);
    expect(genBoundWriters).to.be.calledWithExactly('Setup');

    expect(sut.System()).to.equal(stubs.System);
    expect(genBoundWriters).to.be.calledWithExactly('System');

    expect(sut.ForwardedEvents()).to.equal(stubs.ForwardedEvents);
    expect(genBoundWriters).to.be.calledWithExactly('Forwarded Events');

  });

});