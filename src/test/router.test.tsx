import { m } from '../lib';

const h = m.createElement;

describe('route testing', () => {
  beforeEach(() => {
    // Jest does not clean the JSDOM document after each test run! It only
    // clears the DOM after all tests inside an entire file are completed.
    m.resetState();
    document.body.innerHTML = '';
  });

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

  test('routing to 404', () => {
    const vn2 = h('div', {}, 'page2');
    m.route(document.body, '/page2', () => vn2);

    const load = document.createEvent('HTMLEvents');
    load.initEvent('load', true, true);

    window.location.hash = '/';
    window.dispatchEvent(load);

    expect(document.body.innerHTML).toBe(`404 Page not found`);
  });

  test('routing to custom 404', () => {
    const vn2 = h('div', {}, 'custom 404 page');
    m.route(document.body, '/404', () => vn2);

    const load = document.createEvent('HTMLEvents');
    load.initEvent('load', true, true);

    window.location.hash = '/';
    window.dispatchEvent(load);

    expect(document.body.innerHTML).toBe(`<div>custom 404 page</div>`);
  });
});
