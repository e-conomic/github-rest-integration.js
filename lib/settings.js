"use strict";
var _ = require("lodash")

module.exports = function (opts) {
  var data = {token: undefined}
  _.merge(data, opts || {})
  return data
}
