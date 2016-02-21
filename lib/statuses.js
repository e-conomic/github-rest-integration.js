"use strict";
var Q = require("q")
var validate = require("validate.js")

require("validate.js-enum").register()
validate.Promise = Q.Promise

/**
 * Enum of GitHub states
 * @enum
 */
var STATE = exports.state = {
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
exports.create = function (status) {
  var self = this
  return validate.async(status, schema, {format: "flat"})
    .then(function () {
      return Q.nfcall(self.github.statuses.create, status)
    })
}

/**
 * Promise to return a GitHub status instance
 * @param {string} user
 * @param {string} repo
 * @param {string} sha
 * @param {exports.state} state
 * @param {string} context
 * @param {string=} descr
 * @param {string=} target_url
 * @returns {Object}
 */
exports.Status = function (user, repo, sha, state, context, descr,
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
    })
}
