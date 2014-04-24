'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var rm = require('rimraf');

/**
 * Run a buffer through a child process
 *
 * @param {String} bin
 * @param {Buffer} buf
 * @param {Object} opts
 * @param {Function} cb
 * @api public
 */

module.exports = function (bin, buf, opts, cb) {
    buf = Buffer.isBuffer(buf) ? buf : new Buffer(buf);

    fs.writeFile(opts.src, buf, function (err) {
        if (err) {
            return cb(err);
        }

        execFile(bin, opts.args, function (err) {
            if (err) {
                return cb(err);
            }

            fs.readFile(opts.dest, function (err, buf) {
                if (err) {
                    return cb(err);
                }

                rm(opts.src, function (err) {
                    if (err) {
                        return cb(err);
                    }

                    rm(opts.dest, function (err) {
                        if (err) {
                            return cb(err);
                        }

                        cb(null, buf);
                    });
                });
            });
        });
    });
};
