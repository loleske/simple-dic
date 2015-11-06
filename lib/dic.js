(function () {
  "use strict";

  var annotation = require('annotation');


  var DIC = function () {
    this.registry = [];
    this.instances = [];
    this.factories = [];
  };

  module.exports = DIC;

  DIC.prototype.set = function (name, resolver) {
    this.registry[name] = resolver;
  };

  DIC.prototype.setFactory = function (name, resolver) {
    this.factories[name] = resolver;
  };

  DIC.prototype.get = function (name) {
    if (this.factories[name]) {
      return this.factories[name]();
    }
    if (!this.instances[name] && this.registry[name]) {
      this.instances[name] = this.registry[name]();
    }
    return this.instances[name];
  };


}());
