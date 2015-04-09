# exec-buffer [![Build Status](http://img.shields.io/travis/kevva/exec-buffer.svg?style=flat)](https://travis-ci.org/kevva/exec-buffer)

> Run a Buffer through a child process


## Install

```
$ npm install --save exec-buffer
```


## Usage

```js
var fs = require('fs');
var ExecBuffer = require('exec-buffer');
var gifsicle = require('gifsicle').path;

var execBuffer = new ExecBuffer();

execBuffer.use(gifsicle, ['-o', execBuffer.dest(), execBuffer.src()]);
execBuffer.run(fs.readFileSync('test.gif'), function (err, data) {
		console.log(data);
		//=> <Buffer 47 49 46 38 37 61 ...>
	});
});
```


## API

### new ExecBuffer()

Creates a new `ExecBuffer` instance.

### .use(binary, arguments)

#### binary

Type: `string`

Path to the binary.

#### arguments

Type: `array`

Arguments to run the binary with.

### .src(path)

#### path

Type: `string`

Set or get the temporary source path.

### .dest(path)

#### path

Type: `string`

Set or get the temporary destination path.

### .run(buffer, callback)

Runs the buffer through the child process.

#### buffer

Type: `buffer`

The `buffer` to be ran through the child process.

#### callback(err, data, stderr)

Type: `function`

##### data

Type: `buffer`

The new data produced by the child process.

##### stderr

Type: `string`

Any `stderr` output from the child process.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
