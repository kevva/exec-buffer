'use strict';
var fs = require('fs');
var path = require('path');
var gifsicle = require('gifsicle').path;
var test = require('ava');
var ExecBuffer = require('../');

test('expose a constructor', function (t) {
	t.plan(1);
	t.assert(typeof ExecBuffer === 'function', typeof ExecBuffer);
});

test('set temporary directories', function (t) {
	t.plan(2);
	var execBuffer = new ExecBuffer();
	t.assert(execBuffer.input, execBuffer.input);
	t.assert(execBuffer.output, execBuffer.output);
});

test('set binary and arguments', function (t) {
	t.plan(2);
	var execBuffer = new ExecBuffer().use('foo', ['--bar']);
	t.assert(execBuffer.args[0] === '--bar', execBuffer.args[0]);
	t.assert(execBuffer.bin === 'foo', execBuffer.bin);
});

test('should return a optimized Buffer', function (t) {
	t.plan(2);

	var src = fs.readFileSync(path.join(__dirname, 'fixtures/test.gif'));
	var execBuffer = new ExecBuffer();

	execBuffer
		.use(gifsicle, ['-o', execBuffer.output, execBuffer.input])
		.run(src).then(function (data) {
			t.assert(data.length, data.length);
			t.assert(data.length < src.length, data.length);
		});
});
