# exec-buffer [![Build Status](https://travis-ci.org/kevva/exec-buffer.svg?branch=master)](https://travis-ci.org/kevva/exec-buffer)

> Run a Buffer through a child process

## Install

```bash
$ npm install --save exec-buffer
```

## Usage

```js
var execBuffer = require('exec-buffer');
var fs = require('fs');
var gifsicle = require('gifsicle').path;
var tempfile = require('tempfile');

var src = tempfile('.gif');
var dest = tempfile('.gif');

execBuffer(gifsicle, fs.readFileSync('test.gif'), { src: src, dest: dest, args: ['-o', dest, src] }, function (err, data) {
    if (err) {
        throw err;
    }

    console.log(data);
    // <Buffer 47 49 46 38 37 61 ...>
});
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
