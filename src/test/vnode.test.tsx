import { m } from '../lib';
import { appendChild } from '../lib/vnode';

const h = m.createElement;

test('vnode with children array', () => {
  const vn = m.createElement('div', {}, ['foo', 'bar']);
  m.render(document.body, () => vn);
  expect(document.body.outerHTML).toBe('<body><div>foobar</div></body>');
});

test('vnode with fragment', () => {
  //const vn = createDocFragment('foo');
  appendChild(document.body, h('div', {}, 'thanks'));
  //m.render(document.body, () => vn);
  expect(document.body.outerHTML).toBe(
    '<body><div>foobar</div><div>thanks</div></body>',
  );
});
