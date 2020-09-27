import { setAttrs, addEventListeners } from '../lib/attrs';

test('set attribute class', () => {
  const elem = document.createElement('div');
  setAttrs(elem, { name: 'foo', class: 'bar' });
  expect(elem.outerHTML).toBe(`<div name="foo" class="bar"></div>`);
});

test('set attribute className', () => {
  const elem = document.createElement('div');
  setAttrs(elem, { name: 'foo', className: 'bar' });
  expect(elem.outerHTML).toBe(`<div name="foo" class="bar"></div>`);
});

test('set attribute boolean', () => {
  const elem = document.createElement('input');
  setAttrs(elem, { name: 'foo', required: true });
  expect(elem.outerHTML).toBe(`<input name="foo" required="">`);
});

test('set attribute click false', () => {
  const elem = document.createElement('button');
  let clicked = false;
  setAttrs(elem, {
    onclick: () => {
      clicked = true;
    },
  });
  elem.click();
  expect(elem.outerHTML).toBe(`<button></button>`);
  expect(clicked).toBe(false);
});

test('set attribute click true', () => {
  const elem = document.createElement('button');
  let clicked = false;
  addEventListeners(elem, {
    onclick: () => {
      clicked = true;
    },
  });
  elem.click();
  expect(elem.outerHTML).toBe(`<button></button>`);
  expect(clicked).toBe(true);
});
