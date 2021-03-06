"use strict";
var GitHub = require("github")
var _ = require("lodash")
var expect = require("must")
var s = require("util").format
var Gri = require("../")

describe("github-rest-integration.js", function () {
  it("should be a constructor", function () {
    expect(Gri).to.be.a.constructor()
  })

  it("should initialize a github object", function () {
    expect(new Gri({token: "foo"}).github)
      .to.be.instanceof(GitHub)
  })

  describe("with instance", function () {
    var gri
    beforeEach(function () {
      gri = new Gri()
    })

    var methods = ["gitdata.deleteReference", "issues.createComment",
                   "pullRequests.get", "repos.merge", "statuses.create"]
    methods.forEach(function (meth) {
      it(s("should expose %s", meth), function () {
        expect(_.get(gri, meth), s("%s not exposed", meth))
          .to.be.a.function()
      })
    })

    it("should not clobber namespaces", function () {
      expect(gri.issues).to.not.equal(gri.repos)
    })
  })
})
