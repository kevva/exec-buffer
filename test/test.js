/*global describe, it */
'use strict';

var assert = require('assert');
var ExecBuffer = require('../');
var fs = require('fs');
var gifsicle = require('gifsicle').path;
var path = require('path');

describe('execBuffer()', function () {
    it('should return a optimized Buffer', function (cb) {
        var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.gif'));
        var execBuffer = new ExecBuffer();

        execBuffer
            .use(gifsicle, ['-o', execBuffer.dest(), execBuffer.src()])
            .run(buf, function (err, data) {
                assert(data.length > 0);
                assert(data.length < buf.length);
                cb();
            });
    });
});
