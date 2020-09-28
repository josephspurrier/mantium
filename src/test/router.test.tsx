import { m } from '../lib';

const h = m.createElement;

test('routing between two pages', () => {
  const vn1 = h('div', {}, 'page1');
  const vn2 = h('div', {}, 'page2');

  m.route(document.body, '/', () => vn1);
  m.route(document.body, '/page2', () => vn2);

  const load = document.createEvent('HTMLEvents');
  load.initEvent('load', true, true);

  window.location.hash = '/';
  window.dispatchEvent(load);

  expect(document.body.innerHTML).toBe(`<div>page1</div>`);

  window.location.hash = '/page2';
  window.dispatchEvent(load);

  expect(document.body.innerHTML).toBe(`<div>page2</div>`);
});
