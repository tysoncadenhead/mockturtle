var fs = require('fs'),
    path = require('path');

global.mockTurtleModules = {};

module.exports = function (file, obj, dirname) {

    if (~!file.indexOf('.')) {
        file = file + '.js';
    }

    if (dirname) {
        file = path.resolve(dirname, file);
    }

    var moduleName = 'module_' + new Date().getTime(),
        str = fs.readFileSync(file, 'utf8');

    new Function('mockTurtleModules["' + moduleName + '"] = function (require) { ' + str.replace('module.exports =', 'return') + ' }')();

    return mockTurtleModules[moduleName](function (name) {
        return obj[name] || function () {};
    });

};
