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

test('return an instance if it called without `new`', function (t) {
	t.plan(1);
	t.assert(ExecBuffer() instanceof ExecBuffer);
});

test('set temporary directories', function (t) {
	t.plan(2);
	var execBuffer = new ExecBuffer();
	t.assert(execBuffer.src().length, execBuffer.src().length);
	t.assert(execBuffer.dest().length, execBuffer.dest().length);
});

test('set binary and arguments', function (t) {
	t.plan(2);
	var execBuffer = new ExecBuffer()
		.use('foo', ['--bar']);
	t.assert(execBuffer._use.args[0] === '--bar', execBuffer._use.args[0]);
	t.assert(execBuffer._use.bin === 'foo', execBuffer._use.bin);
});

test('should return a optimized Buffer', function (t) {
	t.plan(3);

	var src = fs.readFileSync(path.join(__dirname, 'fixtures/test.gif'), null);
	var execBuffer = new ExecBuffer();

	execBuffer.use(gifsicle, ['-o', execBuffer.dest(), execBuffer.src()]);
	execBuffer.run(src, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length, data.length);
		t.assert(data.length < src.length, data.length);
	});
});
