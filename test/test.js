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

test('should return a optimized Buffer', function (t) {
	t.plan(4);

	fs.readFile(path.join(__dirname, 'fixtures/test.gif'), function (err, buf) {
		t.assert(!err);

		var execBuffer = new ExecBuffer();

		execBuffer.use(gifsicle, ['-o', execBuffer.dest(), execBuffer.src()]);
		execBuffer.run(buf, function (err, data) {
			t.assert(!err, err);
			t.assert(data.length > 0);
			t.assert(data.length < buf.length);
		});
	});
});
