"use strict";
var Q = require("q")

exports.get = function (user, repo, number) {
  var msg = {
    user: user,
    repo: repo,
    number: number
  }
  return Q.nfcall(this.github.pullRequests.get, msg)
}
