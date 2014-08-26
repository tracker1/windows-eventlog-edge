'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var sut = require('../../src/utils/normalizeMessage');

describe('normalizeMessage', function(){

  describe('when input is an array',function(){
    it ('will return an empty string when array is empty', function(){
      expect(sut([])).to.equal('');
    });

    it('will pass the first value when only one value', function(){
      expect(sut(['test'])).to.equal('test');
    });

    it('will use util.format when multiple values present.', function(){
      expect(sut(['test %s %s', '123', '456'])).to.equal('test 123 456');
    });
  });

  describe('when the input is an object', function(){
    it('will pretty format the response (tabs:4)', function(){
      var input = {test:{value:5}};
      var expected = JSON.stringify(input,null,4);
      expect(sut(input)).to.equal(expected);
    });

    it('will preserve the inherited name, message and stack properties (Error objects)', function(){
      var input = Object.create({
        name:'test name',
        message:'test message',
        stack:'test stack'
      });
      expect(input.hasOwnProperty('name')).to.be.false;
      expect(input.hasOwnProperty('message')).to.be.false;
      expect(input.hasOwnProperty('stack')).to.be.false;

      var output = JSON.parse(sut(input));
      expect(output).to.have.a.property('name',input.name);
      expect(output).to.have.a.property('message',input.message);
      expect(output).to.have.a.property('stack',input.stack);
    });
  });

  describe('when the input is another value', function(){
    it('will return the string when a string', function(){
      expect(sut('test')).to.equal('test');
    });

    it('will return an empty string when empty', function(){
      expect(sut()).to.equal('');
    });

    it('will convert other values to a string', function(){
      expect(sut(123)).to.equal('123');
    });
  });

  
});