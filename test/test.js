import fs from 'fs';
import path from 'path';
import gifsicle from 'gifsicle';
import pify from 'pify';
import test from 'ava';
import Fn from '../';

test('expose a constructor', t => {
	t.is(typeof Fn, 'function');
});

test('set temporary directories', t => {
	const {input, output} = new Fn();
	t.truthy(input);
	t.truthy(output);
});

test('set binary and arguments', t => {
	const {args, bin} = new Fn().use('foo', ['--bar']);
	t.deepEqual(args, ['--bar']);
	t.is(bin, 'foo');
});

test('return a optimized Buffer', async t => {
	const buf = await pify(fs.readFile)(path.join(__dirname, 'fixtures/test.gif'));
	const execBuffer = new Fn();
	const data = await execBuffer
		.use(gifsicle.path, ['-o', execBuffer.output, execBuffer.input])
		.run(buf);

	t.true(data.length < buf.length);
});
