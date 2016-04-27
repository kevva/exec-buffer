import fs from 'fs';
import path from 'path';
import gifsicle from 'gifsicle';
import isGif from 'is-gif';
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
