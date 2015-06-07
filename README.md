# MockTurtle

### Dependency injection for unit testing CommonJS modules.

MockTurtle is a small library for unit testing CommonJS modules in isolation of each other. With MockTurtle, you can write your modules like you normally would, but when you write your tests, you will import your modules using the `MockTurtle()` function instead of `require()`. MockTurtle works with any testing framework that runs in Node.

## Installing

`npm install mockturtle --save-dev`

## API

`MockTurtle()` accepts three parameters: a string representing the path to your file that you want to require, an object with all of your mocked out dependencies to get injected into the module and the `__dirname` of the file. The `__dirname` is used behind the scenes to resolve the module, so it is often very important to remember. Again, the API is:

`MockTurtle(moduleName :string, resolverObect :object, __dirname :string);`

In practice, it might work like this. Let's say you have a module called "Car" that includes a dependency called "Engine".

*car.js*

```
var Engine = require('./engine');

function Car (type) {
    this.engine = new Engine(type);
}

module.exports = Car;
```

*engine.js*
```
function Engine (carType) {
    this.name = carType + ' engine';
}

module.exports = Engine;

```

Typically, if we required `car.js`, the `new Car('truck').engine.name` string would be set to "truck engine". However, with MockTurtle, we can do this:


```
var MockTurtle = require('mockturtle'),

var Car = MockTurtle('./car', {
        './engine': function () {
            this.name = 'Mocked up engine';
        }
    }, __dirname);

console.log(new Car('truck').engine.name);
```

and the value will be set to "Mocked up engine" because that is what we injected.

MockTurtle will replace all of your module dependencies with empty functions by default, so it is up to you to either fill in the pieces by injecting the actual real modules in the test, or create mocks of the dependencies to test with.

## License

MockTurtle is released under The [MIT License](http://www.opensource.org/licenses/MIT) (MIT)

Copyright (c) [2015]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
