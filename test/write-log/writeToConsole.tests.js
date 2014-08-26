'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');
var pr = require('proxyquire').noPreserveCache();

describe('write-log/index', function(){
  var con, cb, sut, opts;

  beforeEach(function(){
    con = { log:sinon.stub() };
    cb = sinon.stub();

    sut = pr('../../src/write-log/writeToConsole',{
      console:con
    });

    opts = {
      type:'type', 
      log:'log', 
      source:'source',
      message:'message'
    };
  });

  it('will call console.log',function(){    
    sut(opts,cb);
    var args = con.log.firstCall.args;
    expect(args[0]).to.equal('%s\t%s\t%s\t%s\t%s');
    expect(args[1]).to.equal('type');
    expect(args[2]).to.match(/^\d\d\d\d\-\d\d\-\d\dT\d\d\:\d\d:\d\d\.\d\d\dZ$/);
    expect(args[3]).to.equal('log');
    expect(args[4]).to.equal('source');
    expect(args[5]).to.equal('message');
    expect(cb).to.be.calledWithExactly(null,null);
  });

  it('will not require a callback',function(){
    expect(function(){ sut(opts); }).to.not.throw();
  });

});