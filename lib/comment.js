"use strict";
var Q = require("q")
var util = require("util")
var validate = require("validate.js")
var getGithub = require("./get-github")

validate.Promise = Q.Promise

var schema = exports.schema = {
  user: {presence: true},
  repo: {presence: true},
  number: {presence: true},
  body: {presence: true}
}

exports.create = function (comment) {
  return validate.async(comment, schema, {format: "flat"})
    .then(function () {
      return Q.nfcall(getGithub().issues.createComment, comment)
    })
}

exports.getComment = function (user, repo, number, body) {
  var status = {
    user: user,
    repo: repo,
    number: number,
    body: body
  }
  return validate.async(status, schema, {format: "flat"})
    .then(function () {
      return status
    }, function (msg) {
      throw new Error(msg)
    })
}
