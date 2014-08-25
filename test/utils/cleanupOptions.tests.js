'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();

chai.should();
chai.use(require('sinon-chai'));

describe('cleanupOptions', function(){
  var sut, clone, cleanupSource, normalizeLog, normalizeType, normalizeMessage;

  beforeEach(function(){
    clone = sinon.stub();
    cleanupSource = sinon.stub();
    normalizeLog = sinon.stub();
    normalizeType = sinon.stub();
    normalizeMessage = sinon.stub();

    clone.returnsArg(0);
    cleanupSource.returnsArg(0);
    normalizeLog.returnsArg(0);
    normalizeType.returnsArg(0);
    normalizeMessage.returnsArg(0);

    sut = pr('../../src/utils/cleanupOptions', {
      'safe-clone-deep':clone,
      './cleanupSource':cleanupSource,
      './normalizeLog':normalizeLog,
      './normalizeType':normalizeType,
      './normalizeMessage':normalizeMessage
    });
  });

  it('will call the expected methods', function(){
    var opts = {log:'log',type:'type',message:'message'};
    sut(opts);
    clone.should.have.been.calledWithExactly(opts);
    cleanupSource.should.have.been.calledWithExactly(opts);
    normalizeLog.should.have.been.calledWithExactly(opts.log);
    normalizeType.should.have.been.calledWithExactly(opts.type);
    normalizeMessage.should.have.been.calledWithExactly(opts.message);
  });

});