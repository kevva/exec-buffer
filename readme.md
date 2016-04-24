# exec-buffer [![Build Status](http://img.shields.io/travis/kevva/exec-buffer.svg?style=flat)](https://travis-ci.org/kevva/exec-buffer)

> Run a buffer through a child process


## Install

```
$ npm install --save exec-buffer
```


## Usage

```js
const fs = require('fs');
const ExecBuffer = require('exec-buffer');
const gifsicle = require('gifsicle').path;

const exec = new ExecBuffer();

exec
	.use(gifsicle, ['-o', exec.output, exec.input]);
	.run(fs.readFileSync('test.gif')).then(data => {
		console.log(data);
		//=> <Buffer 47 49 46 38 37 61 ...>
	});
```


## API

### new ExecBuffer(options)

Creates a new `ExecBuffer` instance.

#### options

##### input

Type: `string`<br>
Default: `tmp`

Set the temporary input path.

##### output

Type: `string`<br>
Default: `tmp`

Set the temporary output path.

### .use(binary, arguments)

#### binary

Type: `string`

Path to the binary.

#### arguments

Type: `array`

Arguments to run the binary with.

### .run(buffer)

Runs the buffer through the child process. Returns a promise for a buffer.

#### buffer

Type: `buffer`

The `buffer` to be ran through the child process.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
