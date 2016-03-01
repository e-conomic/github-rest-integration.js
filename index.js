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
  {prefix: "pullRequests", module: require("./lib/pr")},
  {prefix: "statuses", module: require("./lib/statuses")}
]
extensions.forEach(function (data) {
  var prefix = data.prefix
  var module = data.module
  Object.defineProperty(Manager.prototype, prefix, {
    get: function () {
      var self = this
      if (!self._f) {
        self._f = {}
        for (var name in module) {
          var func = module[name]
          if (_.isFunction(func))
            self._f[name] = func.bind(self)
          else
            self._f[name] = func
        }
      }
      return self._f
    },
    enumerable: false,
    configurable: true
  })
})

module.exports = Manager
