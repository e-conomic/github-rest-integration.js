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
  {prefix: "statuses", module: require("./lib/statuses")}
]
extensions.forEach(function (data) {
  Object.defineProperty(Manager.prototype, data.prefix, {
    get: function () {
      var self = this
      var f = {}
      for (var name in data.module) {
        var func = data.module[name]
        if (_.isFunction(func))
          f[name] = func.bind(self)
        else
          f[name] = data.module[name]
      }
      return f
    },
    enumerable: false,
    configurable: true
  })
})

module.exports = Manager
