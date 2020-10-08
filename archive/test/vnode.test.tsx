import { m } from '../lib';

test('vnode with children array', () => {
  const vn = m.createElement('div', {}, ['foo', 'bar']);
  m.render(document.body, () => vn);
  expect(document.body.outerHTML).toBe('<body><div>foobar</div></body>');
});
