'use strict';

module.exports = Thrower;

/**
 * Error management
 * @constructor
 * @param {object} opts - configurable parameters for analysis operations
 */
function Thrower (opts) {
  this.opts = opts;
  this.err = null;
  return this;
}

Thrower.prototype.throw = function (msg) {
  var err = new Error(msg);
  if (this.opts.throw) {
    throw err;
  }
  this.err = err;
  return this;
};
