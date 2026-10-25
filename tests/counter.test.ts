import test from 'node:test';
import assert from 'node:assert/strict';
import { eventUrl, parseCount, readCount, visitPath, contactPaths } from '../src/counter.ts';

test('collection uses fixed page/event identifiers without visitor details', () => {
  const visit = new URL(eventUrl(visitPath));
  assert.equal(visit.origin, 'https://rilcura-portfolio.goatcounter.com');
  assert.equal(visit.searchParams.get('p'), '/web-portfolio');
  assert.equal(visit.searchParams.get('ns'), 'true');
  assert.equal(visit.searchParams.has('e'), false);
  assert.deepEqual([...visit.searchParams.keys()].sort(), ['ns','p','t']);
  for (const path of contactPaths) assert.equal(new URL(eventUrl(path,true)).searchParams.get('e'), 'true');
});
test('formats counts safely and rejects missing, malformed or unsafe totals', () => {
  assert.equal(parseCount({count:'1,234'}), 1234);
  assert.equal(parseCount({count:'0'}), 0);
  for (const data of [null, {}, {count:-1}, {count:'1,2'}, {count:'<script>'}, {count:'9007199254740992'}])
    assert.throws(() => parseCount(data));
});
test('reads public counts, treats only missing event paths as zero, and fails closed', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (input, options) => {
      const url = new URL(String(input));
      assert.ok(url.pathname.endsWith('%2Fweb-portfolio.json'));
      assert.equal(url.searchParams.get('start'), '2026-10-01');
      assert.equal(options?.credentials, 'omit');
      assert.equal(options?.referrerPolicy, 'no-referrer');
      return new Response(JSON.stringify({count:'42'}));
    };
    assert.equal(await readCount(visitPath), 42);
    globalThis.fetch = async () => new Response('{}', {status:404});
    assert.equal(await readCount(contactPaths[0], true), 0);
    await assert.rejects(readCount(visitPath));
    globalThis.fetch = async () => new Response('{}', {status:403});
    await assert.rejects(readCount(contactPaths[0], true));
    globalThis.fetch = async () => { throw new Error('Offline'); };
    await assert.rejects(readCount(visitPath));
  } finally { globalThis.fetch = original; }
});
