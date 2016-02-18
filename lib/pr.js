"use strict";
var Q = require("q")
var getGithub = require("./get-github")

/**
 * Promise to get a Github pull-request
 */
exports.get = function (user, repo, number) {
  var msg = {
    user: user,
    repo: repo,
    number: number
  }

  return Q.nfcall(getGithub().pullRequests.get, msg)
}
