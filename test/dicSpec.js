(function () {
  "use strict";

  var chai = require('chai');
  var expect = chai.expect;

  var DIC = require('../lib/dic.js');
  var App;

  var Fixture = function() {
    this.date = Date.now();
    this.test = "test";
  };

  var Fixture2 = function (fixture) {
    this.test = fixture;
  };

  var resolver = function () {
    return new Fixture();
  };

  describe("DIC Class", function () {

    beforeEach(function () {
      App = new DIC();
    });

    describe("#set", function () {
      it("should set resolver in registry", function () {
        App.set('test', resolver);
        expect(App.registry.test).to.be.equal(resolver);
      });
    });

    describe("#setFactory", function () {
      it("should set resolver in factories", function () {
        App.setFactory('test', resolver);
        expect(App.factories.test).to.be.equal(resolver);
      });
    });

    describe("#get", function () {
      beforeEach(function () {
        App.set("test", resolver);
        App.setFactory("test2", resolver);
      });
      it("should return an instance of Fixture", function () {
        expect(App.get("test")).to.be.instanceOf(Fixture);
        expect(App.get("test2")).to.be.instanceOf(Fixture);
      });
      it("should return a singleton of Fixture", function () {
        expect(App.get("test")).to.be.deep.equal(App.get("test"));
      });
      it("should return a new instance of Fixture", function () {
        expect(App.get("test2")).to.not.equal(App.get("test2"));
      });
      it("should return a new instance of Fixture2 with Fixture singleton dependency", function () {
        App.set("test3", function () {
          return new Fixture2(App.get("test"));
        });
        expect(App.get("test3").test).to.be.equal(App.get("test"));
      });
      it("should return a new instance of Fixture2 with Fixture factory dependency", function () {
        App.setFactory("test3", function () {
          return new Fixture2(App.get("test2"));
        });
        expect(App.get("test3").test).to.not.equal(App.get("test3").test);
      });

      
    });

  });
}());
