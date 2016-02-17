"use strict";
var GitHub = require("github")

module.exports = function () {
  var github = new GitHub({version: "3.0.0", timeout: 5000})
  github.authenticate({type: "oauth", token: process.env.GH_TOKEN})
  return github
}
