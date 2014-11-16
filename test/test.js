'use strict';

var ExecBuffer = require('../');
var fs = require('fs');
var gifsicle = require('gifsicle').path;
var path = require('path');
var test = require('ava');

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
