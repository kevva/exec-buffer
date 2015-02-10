'use strict';

var ExecBuffer = require('../');
var fs = require('fs');
var gifsicle = require('gifsicle').path;
var path = require('path');
var test = require('ava');

test('expose a constructor', function (t) {
	t.plan(1);
	t.assert(typeof ExecBuffer === 'function');
});

test('return an instance if it called without `new`', function (t) {
	t.plan(1);
	t.assert(ExecBuffer() instanceof ExecBuffer);
});

test('set temporary directories', function (t) {
	t.plan(2);
	var execBuffer = new ExecBuffer();
	t.assert(execBuffer.src().length);
	t.assert(execBuffer.dest().length);
});

test('set binary and arguments', function (t) {
	t.plan(2);
	var execBuffer = new ExecBuffer()
		.use('foo', ['--bar']);
	t.assert(execBuffer._use.args[0] === '--bar');
	t.assert(execBuffer._use.bin === 'foo');
});

test('should return a optimized Buffer', function (t) {
	t.plan(3);

	var src = fs.readFileSync(path.join(__dirname, 'fixtures/test.gif'), null);
	var execBuffer = new ExecBuffer();

	execBuffer.use(gifsicle, ['-o', execBuffer.dest(), execBuffer.src()]);
	execBuffer.run(src, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length);
		t.assert(data.length < src.length);
	});
});
