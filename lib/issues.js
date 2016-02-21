"use strict";
var Q = require("q")
var validate = require("validate.js")

validate.Promise = Q.Promise

var schema = exports.schema = {
  user: {presence: true},
  repo: {presence: true},
  number: {presence: true},
  body: {presence: true}
}

exports.createComment = function (comment) {
  var self = this
  return validate.async(comment, schema, {format: "flat"})
    .then(function () {
      return Q.nfcall(self.github.issues.createComment, comment)
    })
}

exports.Comment = function (user, repo, number, body) {
  var status = {
    user: user,
    repo: repo,
    number: number,
    body: body
  }
  return validate.async(status, schema, {format: "flat"})
    .then(function () {
      return status
    })
}
