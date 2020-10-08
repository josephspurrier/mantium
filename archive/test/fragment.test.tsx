import { m } from '../lib';
import { cleanState } from '../lib/fragment';

const h = m.createElement;

test('div should turn into ROOTFRAGMENT', () => {
  const vn = h('div');
  const out = cleanState(vn);
  expect(out).toStrictEqual({
    tag: 'ROOTFRAGMENT',
    attrs: {},
    children: [{ tag: 'div', attrs: {}, children: [] }],
  });
});

test('top level fragment should turn into ROOTFRAGMENT', () => {
  const vn = h('FRAGMENT', {}, 'hello');
  const out = cleanState(vn);
  expect(out).toStrictEqual({
    tag: 'ROOTFRAGMENT',
    attrs: {},
    children: ['hello'],
  });
});

test('fragment under div to ROOTFRAGMENT', () => {
  const vn = h('div', {}, h('FRAGMENT', {}, 'hello'));
  const out = cleanState(vn);
  expect(out).toStrictEqual({
    tag: 'ROOTFRAGMENT',
    attrs: {},
    children: [{ tag: 'div', attrs: {}, children: ['hello'] }],
  });
});
