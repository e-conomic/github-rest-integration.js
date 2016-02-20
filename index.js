"use strict";
var GitHub = require("github")
var _ = require("lodash")
var getSettings = require("./lib/settings")

var Manager = function (opts) {
  this.settings = getSettings(opts)

  Object.defineProperty(this, "github", {
    get: function () {
      var self = this
      if (!this._github) {
        this._github = new GitHub({version: "3.0.0", timeout: 5000})
        this._github.authenticate({type: "oauth", token: self.settings.token})
      }
      return this._github
    },
    set: function (val) {
      this._github = val
    }
  })
}

var extensions = [
  {prefix: "issues", module: require("./lib/issues")},
  {prefix: "pullRequest", module: require("./lib/pr")},
  //{prefix: "status", module: require("./lib/status")}
]
extensions.forEach(function (data) {
  Object.defineProperty(Manager.prototype, data.prefix, {
    get: function () {
      var self = this
      var f = {}
      for (var fName in data.module)
        if (_.isFunction(data.module[fName]))
          f[fName] = data.module[fName].bind(self)
      return f
    },
    enumerable: false,
    configurable: true
  })
})

module.exports = Manager
