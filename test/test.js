/*global describe, it */
'use strict';

var assert = require('assert');
var execBuffer = require('../');
var fs = require('fs');
var gifsicle = require('gifsicle').path;
var path = require('path');
var tempfile = require('tempfile');

describe('execBuffer()', function () {
    it('should return a optimized Buffer', function (cb) {
        var src = tempfile('.gif');
        var dest = tempfile('.gif');
        var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.gif'));

        execBuffer(gifsicle, buf, { src: src, dest: dest, args: ['-o', dest, src] }, function (err, data) {
            assert(data.length > 0);
            assert(data.length < buf.length);
            cb();
        });
    });
});
