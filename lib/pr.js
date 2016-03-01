"use strict";
var Q = require("q")

exports.get = function (msg) {
  return Q.nfcall(this.github.pullRequests.get, msg)
}
