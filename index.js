'use strict';
const fs = require('fs');
const execa = require('execa');
const pify = require('pify');
const tempfile = require('tempfile');
const fsP = pify(fs);

class ExecBuffer {
	constructor(opts) {
		this.opts = opts || {};
		this.input = this.opts.input || tempfile();
		this.output = this.opts.output || tempfile();
	}

	use(bin, args) {
		this.bin = bin;
		this.args = args;
		return this;
	}

	run(buf) {
		if (!Buffer.isBuffer(buf)) {
			return Promise.reject(new TypeError('Expected a buffer'));
		}

		return fsP.writeFile(this.input, buf)
			.then(() => execa(this.bin, this.args))
			.then(() => fsP.readFile(this.output));
	}
}

module.exports = ExecBuffer;
