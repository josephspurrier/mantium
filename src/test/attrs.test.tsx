import { setAttrs, addEventListeners, updateAttrs } from '../lib/attrs';

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

test('remove attribute boolean', () => {
  const elem = document.createElement('button');
  let clicked = 1;
  const oldAttrs = {
    name: 'foo',
    required: true,
    grade: 1,
    className: 'blue',
    onclick: () => {
      clicked++;
    },
  };
  const newAttrs = { name: 'bar', required: false };
  setAttrs(elem, oldAttrs);
  addEventListeners(elem, oldAttrs);
  elem.click();
  expect(elem.outerHTML).toBe(
    `<button name="foo" required="" grade="1" class="blue"></button>`,
  );
  expect(clicked).toBe(2);
  updateAttrs(elem, newAttrs, oldAttrs);
  elem.click();
  expect(elem.outerHTML).toBe(`<button name="bar"></button>`);
  // FIXME: This needs to be 3 instead of 2. Need to add code to remove event
  // handlers.
  expect(clicked).toBe(3);
});

test('event redrawer', () => {
  const elem = document.createElement('button');
  let clicked = false;
  let redrew = false;
  addEventListeners(
    elem,
    {
      onclick: () => {
        clicked = true;
      },
    },
    () => {
      redrew = true;
    },
  );
  elem.click();
  expect(elem.outerHTML).toBe(`<button></button>`);
  expect(clicked).toBe(true);
  expect(redrew).toBe(true);
});
