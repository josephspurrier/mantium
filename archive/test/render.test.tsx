import { m } from '../lib';

test('render string', () => {
  m.render(document.body, 'hello world');
  expect(document.body.outerHTML).toBe('<body>hello world</body>');
});

test('render boolean true', () => {
  m.render(document.body, true);
  expect(document.body.outerHTML).toBe('<body>true</body>');
});

test('render boolean false', () => {
  m.render(document.body, false);
  expect(document.body.outerHTML).toBe('<body>false</body>');
});

test('render number 0', () => {
  m.render(document.body, 0);
  expect(document.body.outerHTML).toBe('<body>0</body>');
});

test('render number 1', () => {
  m.render(document.body, 1);
  expect(document.body.outerHTML).toBe('<body>1</body>');
});

test('render number', () => {
  m.render(document.body, 100);
  expect(document.body.outerHTML).toBe('<body>100</body>');
});

test('render function div', () => {
  m.render(document.body, () => {
    return <div>hello world</div>;
  });
  expect(document.body.outerHTML).toBe('<body><div>hello world</div></body>');
});

test('render function fragment', () => {
  m.render(document.body, () => {
    return (
      <>
        <div>element 1</div>
        <div>element 2</div>
      </>
    );
  });
  expect(document.body.outerHTML).toBe(
    '<body><div>element 1</div><div>element 2</div></body>',
  );
});
