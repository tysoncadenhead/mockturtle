var Engine = require('./engine');

function Car (type) {
    this.engine = new Engine(type);
}

module.exports = Car;
