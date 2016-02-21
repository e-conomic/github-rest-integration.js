"use strict";
require("must")
var sinon = require("sinon")
var Gri = require("../")

describe("#statuses", function () {
  var box, gri, stub
  before(function () { box = sinon.sandbox.create() })

  beforeEach(function () {
    gri = new Gri()
    stub = {statuses: {create: box.stub()}}
    gri.github = stub
  })

  afterEach(function () {
    box.restore()
  })

  describe("#create", function () {
    it("should call correctly", function () {
      stub.statuses.create.yields(null, "data")
      var status = {
        user: "u", repo: "r", sha: "1", state: gri.statuses.state.pending,
        context: "c"
      }
      return gri.statuses.create(status)
        .must.resolve.to.eql("data")
    })
  })

  describe("#Status", function () {
    it("should return a comment", function () {
      var c = new gri.statuses.Status(
        "u", "r", "1", gri.statuses.state.pending, "c")
      c.must.be.object()
    })
  })
})
