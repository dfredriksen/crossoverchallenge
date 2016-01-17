/*global require, module, __dirname */
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var tasksPath = path.join(__dirname, '/tasks');

fs
  .readdirSync(tasksPath)
  .forEach(function (file) {
    require(path.join(tasksPath, file));
  });

module.exports = gulp;
