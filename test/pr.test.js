"use strict";
require("must")
var sinon = require("sinon")
var Gri = require("../")

describe("#pullRequest", function () {
  var box, gri, stub
  before(function () { box = sinon.sandbox.create() })

  beforeEach(function () {
    gri = new Gri()
    stub = {pullRequests: {get: box.stub()}}
    gri.github = stub
  })

  afterEach(function () {
    box.restore()
  })

  describe("#get", function () {
    it("should call correctly", function () {
      stub.pullRequests.get.yields(null, "data")
      return gri.pullRequest.get("user", "repo", 1)
        .must.resolve.to.eql("data")
    })
  })
})
