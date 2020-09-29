import { m } from '../lib';

//const h = m.createElement;

test('render string', () => {
  m.render(document.body, 'hello world');
  m.redraw();
  m.redraw();
  expect(document.body.outerHTML).toBe('<body>hello world</body>');
});
