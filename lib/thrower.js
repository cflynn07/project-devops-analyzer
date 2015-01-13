'use strict';

module.exports = function (opts, msg) {
  if (opts.throw) {
    throw new Error(msg);
  }
  return this;
};
