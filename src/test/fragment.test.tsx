import { m } from '../lib';
import { cleanState } from '../lib/fragment';

test('set attribute class', () => {
  const vn = m.createElement('div');
  cleanState(vn);
  expect(vn).toStrictEqual({ attrs: {}, children: [], tag: 'div' });
});
