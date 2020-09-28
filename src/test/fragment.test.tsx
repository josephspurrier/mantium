import { m } from '../lib';
import { cleanState } from '../lib/fragment';

const h = m.createElement;

test('set attribute class', () => {
  const vn = h('div');
  cleanState(vn);
  expect(vn).toStrictEqual({ attrs: {}, children: [], tag: 'div' });
});
