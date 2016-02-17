"use strict";
require("must")
var Q = require("q")
var gri = require("./")

var testGetStatus = function () {
  return gri.status.getStatus("user", "repo", "sha",
                              gri.status.STATE.success, "context",
                              "description", "http://target.url")
    .then(function (status) {
      render("gri.status.getStatus", JSON.stringify(status, null, 2))
      return arguments
    })
    .must.resolve.to.object()
}

var testStatusSet = function () {
  return gri.status.set({
                          "user": "e-conomic",
                          "repo": "process-playground",
                          "sha": "df54e1588f4357352aa2bc90c9782be300969861",
                          "state": "pending",
                          "context": "Test"
                        })
    .then(function (result) {
      render("gri.status.set", JSON.stringify(result, null, 2))
      return arguments
    })
    .must.resolve.to.object()
}

var testGetComment = function () {
  return gri.comment.getComment("user", "repo", "42", "content")
    .then(function (comment) {
      render("gri.comment.getComment", JSON.stringify(comment, null, 2))
      return arguments
    })
    .must.resolve.to.object()
}

var testCreateComment = function () {
  return gri.comment.create(
    {
      "user": "e-conomic",
      "repo": "process-playground",
      "number": "46",
      "body": "body"
    })
    .then(function (result) {
      render("gri.comment.create", JSON.stringify(result, null, 2))
      return arguments
    })
    .must.resolve.to.object()
}

var render = function (headline, content) {
  console.log(headline + ":")
  console.log(content)
}

var run = function () {
  return [
    testGetStatus(),
    testStatusSet(),
    testGetComment(),
    testCreateComment()
  ]
}
Q.all(run()).done()
