"use strict";
var Q = require("q")
var validate = require("validate.js")
var getGithub = require("./get-github")

require("validate.js-enum").register()
validate.Promise = Q.Promise

/**
 * Enum of GitHub states
 * @enum
 */
var STATE = exports.STATE = {
  pending: "pending",
  success: "success",
  failure: "failure",
  error: "error"
}

var schema = exports.schema = {
  user: {presence: true},
  repo: {presence: true},
  sha: {presence: true},
  state: {presence: true, enumAsync: STATE},
  context: {presence: true},
  description: {},
  target_url: {}
}

/**
 * Promise to create a Github status
 * @param {Object} status `schema`-like object
 */
exports.set = function (status) {
  return validate.async(status, schema, {format: "flat"})
    .then(function () {
      return Q.nfcall(getGithub().statuses.create, status)
    })
}

/**
 * Promise to construct a GitHub status object
 * @param {string} user
 * @param {string} repo
 * @param {string} sha
 * @param {exports.STATE} state
 * @param {string} context
 * @param {string=} descr
 * @param {string=} target_url
 * @returns {Object}
 */
exports.getStatus = function (user, repo, sha, state, context, descr,
                              target_url) {
  var status = {
    user: user,
    repo: repo,
    sha: sha,
    state: state,
    context: context,
    description: descr,
    target_url: target_url
  }
  return validate.async(status, schema, {format: "flat"})
    .then(function () {
      return status
    }, function (msg) {
      throw new Error(msg)
    })
}
