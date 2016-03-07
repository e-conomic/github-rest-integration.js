"use strict";
var Q = require("q")

exports.deleteReference = function (msg) {
  return Q.nfcall(this.github.gitdata.deleteReference, msg)
}
