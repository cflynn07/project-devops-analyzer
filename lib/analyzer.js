'use strict';

module.exports = Analyzer;

//var suggestableServicesNode = require('../configs/suggestableServicesNode');
//var suggestableServicesPython = require('../configs/suggestableServicesPython');
//var suggestableServicesRuby = require('../configs/suggestableServicesRuby');
var Thrower = require('./thrower');

var debug = require('debug')('project-devops-analyzer');
var defaults = require('defaults');
var equals = require('101/equals');
var find = require('101/find');
var hasKeypaths = require('101/has-keypaths');
var isArray = Array.isArray;
var isObject = require('101/is-object');
var isString = require('101/is-string');
var passAny = require('101/pass-any');

// Private
var opts;
var thrower;

/**
 * Package of analyzer utilities
 * @constructor
 * @param {object} opts - configurable parameters for analysis operations
 */
function Analyzer (_opts_) {
  debug('new Analyzer w/ opts: ' + _opts_);
  opts = _opts_ || {};
  opts = defaults(opts, {
    throw: false
  });
  this.dependencyFile = null;
  this.language = null;
  thrower = new Thrower(opts);
  Object.defineProperty(this, 'err', {
    get: function () {
      return thrower.err;
    }
  });
  return this;
}

/**
 * Infer project language and/or framework from presence of identifying files
 * in repository root directory
 * @param {array} contents - list of files in root directory of repository
 *   [works with GitHub API response GET /repos/:owner/:repo/contents/:path]
 *   https://developer.github.com/v3/repos/contents/#get-contents
 */
Analyzer.prototype.inferLanguageFramework = function (contents) {
  if (!isArray(contents) ||
      (isArray(contents) && contents.length &&
       !(isObject(contents[0] || isString(contents[0]))))) {
    debug('invalid argument - inferLanguageFramework - ' + arguments);
    return thrower.throw('invalid argument, contents must be an Array');
  }
  var dependencyFile;
  if (contents.length && isString(contents[0])) {
    dependencyFile = find(contents, passAny(
      equals('Gemfile'),
      equals('package.json'),
      equals('requirements.txt')
    ));
  }
  else if (contents.length && isObject(contents[0])) {
    dependencyFile = find(contents, passAny(
      hasKeypaths({'name': 'Gemfile'}),
      hasKeypaths({'name': 'package.json'}),
      hasKeypaths({'name': 'requirements.txt'})
    ));
  }
  if (!dependencyFile) { return thrower.throw('unable to infer project type'); }
  this.dependencyFile = dependencyFile.name;
  switch (this.dependencyFile) {
    case 'Gemfile':
      this.language = 'ruby';
      break;
    case 'package.json':
      this.language = 'javascript';
      break;
    case 'requirements.txt':
      this.language = 'python';
      break;
  }
  return this;
};
