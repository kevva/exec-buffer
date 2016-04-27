'use strict';
const fs = require('fs');
const execa = require('execa');
const pify = require('pify');
const tempfile = require('tempfile');
const fsP = pify(fs);
const input = Symbol('input');
const output = Symbol('output');
const obj = {
	[input]: tempfile(),
	[output]: tempfile()
};

module.exports = opts => {
	opts = Object.assign({}, opts);

	if (!Buffer.isBuffer(opts.input)) {
		return Promise.reject(new Error('Input is required'));
	}

	if (typeof opts.bin !== 'string') {
		return Promise.reject(new Error('Binary is required'));
	}

	if (!Array.isArray(opts.args)) {
		return Promise.reject(new Error('Arguments are required'));
	}

	return fsP.writeFile(obj[input], opts.input)
		.then(() => execa(opts.bin, opts.args))
		.then(() => fsP.readFile(obj[output]));
};

module.exports.input = obj[input];
module.exports.output = obj[output];
