"use strict";
require("must")
var sinon = require("sinon")
var Gri = require("../")

describe("#comment", function () {
  var box, gri, stub
  before(function () { box = sinon.sandbox.create() })

  beforeEach(function () {
    gri = new Gri()
    stub = {issues: {createComment: box.stub()}}
    gri.github = stub
  })

  afterEach(function () {
    box.restore()
  })

  describe("#createComment", function () {
    it("should call correctly", function () {
      stub.issues.createComment.yields(null, "data")
      var comment = {user: "u", repo: "r", number: 1, body: "b"}
      return gri.issues.createComment(comment)
        .must.resolve.to.eql("data")
    })
  })

  describe("#Comment", function () {
    it("should return a comment", function () {
      var c = new gri.issues.Comment("u", "r", 1, "b")
      c.must.be.object()
    })
  })
})
