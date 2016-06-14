import fs from 'fs';
import path from 'path';
import gifsicle from 'gifsicle';
import isGif from 'is-gif';
import pathExists from 'path-exists';
import pify from 'pify';
import test from 'ava';
import m from './';

test('set temporary directories', t => {
	const {input, output} = m;
	t.truthy(input);
	t.truthy(output);
});

test('return a optimized buffer', async t => {
	const buf = await pify(fs.readFile)(path.join(__dirname, 'fixture.gif'));
	const data = await m({
		input: buf,
		bin: gifsicle.path,
		args: ['-o', m.output, m.input]
	});

	t.true(data.length < buf.length);
	t.true(isGif(data));
});

test('remove temporary files', async t => {
	const buf = await pify(fs.readFile)(path.join(__dirname, 'fixture.gif'));
	const err = await t.throws(m({
		input: buf,
		bin: 'foobarunicorn',
		args: [m.output, m.input]
	}));

	t.is(err.code, 'ENOENT');
	t.false(await pathExists(err.spawnargs[0]));
	t.false(await pathExists(err.spawnargs[1]));
});
