'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();

describe('genWriter', function(){

  var sut, bound, writeLog;

  beforeEach(function(){
    writeLog = sinon.stub();
    sut = pr('../../src/utils/genWriter', {
      '../write-log': writeLog
    });
    bound = sut('log','source','type');
  });

  it('will call writeLog with the expected values', function(){
    bound();
    var options = writeLog.firstCall.args[0];
    expect(options).to.have.property('log','log');
    expect(options).to.have.property('source','source');
    expect(options).to.have.property('type','type');
    expect(options.message).to.equal(undefined);
  });

  it('will separate the arguments as the message when more than one', function(){
    bound('first','second');
    var msg = writeLog.firstCall.args[0].message;
    expect(msg.length).to.equal(2);
    expect(msg[0]).to.equal('first');
    expect(msg[1]).to.equal('second');
  });

});