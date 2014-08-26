'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();

var expect = chai.expect;
chai.should();
chai.use(require('sinon-chai'));

describe('write-log/index', function(){
  var sut, con, cleanupOptions, write, getWrite;
  var output, cb;

  beforeEach(function(){
    con = {error:sinon.stub()};
    cleanupOptions = sinon.stub();
    write = sinon.stub();
    getWrite = sinon.stub().returns(write);

    cleanupOptions.returnsArg(0);

    sut = pr('../../src/write-log/index',{
      'console':con,
      '../utils/cleanupOptions':cleanupOptions,
      './getPlatformWriter': getWrite
    });
  });

  function run(options) {
    sut(options);
    output = write.firstCall.args[0];
    cb = write.firstCall.args[1];
  }

  it('will throw an error without options', function(){
    expect(sut).to.throw(Error);
  });

  it('will nest a string as a message parameter', function(){
    run('test');
    expect(output).to.have.property('message','test');
  });

  it('will call console.error as a default error handler for the writer', function(){
    run('test');
    cb('error');
    expect(con.error).to.be.calledWithExactly('error');
  });

  it('will return an error state if there is no message property on the object',function(){
    var cb = sinon.stub();
    sut({},cb);
    var err = cb.firstCall.args[0];
    var status = cb.firstCall.args[1];
    expect(err).to.have.property('message','The options argument must have a message property.');
    expect(status).to.have.property('success',false);
  });

  it('will pass options to cleanupOptions', function(){
    var opts = {message:'test'};
    sut(opts);
    expect(cleanupOptions).to.be.calledWithExactly(opts);
    cb(null);
    expect(con.error).to.not.be.called;
  });

});