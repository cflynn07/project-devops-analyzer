'use strict';

var lab = exports.lab = require('lab').script();
var Code = require('code');
var after = lab.after;
var afterEach = lab.afterEach;
var before = lab.before;
var beforeEach = lab.beforeEach;
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

var Analyzer = require('../index');

describe('Analyzer', function () {
  describe('Options adherence', function () {
    it('Should throw exceptions', function (done) {
      var analyzer = new Analyzer({
        throw: true
      });
      try {
        analyzer.inferLanguageFramework(null);
      } catch (e) {
        expect(e.message).to.equal('invalid argument, contents must be an Array');
        done();
      }
    });

    it('Should not throw exceptions when encountering errors if passed '+
       '{throw: false}', function (done) {
      var analyzer = new Analyzer({
        throw: false
      });
      analyzer.inferLanguageFramework(null);
      expect(analyzer.err.message).to.equal('invalid argument, contents must be an Array');
      done();
    });
  });
});
