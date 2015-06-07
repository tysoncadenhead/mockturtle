var assert = require('assert');

var MockTurtle = require('../lib/mockturtle');

describe('MockTurtle tests', function () {

    describe('When we do not inject anything', function () {

        it('should not mock anything', function () {

            var Car = require('../examples/car');

            var car = new Car('truck');

            assert.equal(car.engine.name, 'truck engine');
        })

    });

    describe('When we inject an object', function () {

        it('should resolve to the mocked object', function () {

            var Car = MockTurtle('../examples/car', {
                    './engine': function () {
                        this.name = 'Mocked up engine';
                    }
                }, __dirname);

            var car = new Car('truck');

            assert.equal(car.engine.name, 'Mocked up engine');
        })

    });

    describe('When we inject a function', function () {

        it('should resolve to the mocked function', function () {

            var Car = MockTurtle('../examples/car', {
                    './engine': function () {
                        this.getName = function () {
                            return 'I am engine';
                        };
                    }
                }, __dirname);

            var car = new Car('truck');

            assert.equal(car.engine.getName(), 'I am engine');
        });

    });


    describe('When we do not pass any dependencies in', function () {

        it('should resolve empty functions', function () {

            var Car = MockTurtle('../examples/car', {}, __dirname);

            var car = new Car('truck');

            assert.equal(typeof car.engine, 'object');
        });

    });


});
