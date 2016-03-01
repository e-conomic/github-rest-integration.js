"use strict";
var Q = require("q")

exports.merge = function (msg) {
  return Q.nfcall(this.github.repos.merge, msg)
}
