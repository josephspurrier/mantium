import { renderDone } from './helper';
import { m } from '../index';

test('render string', (done) => {
  m.render('hello world', document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body>hello world</body>');
  });
});

test('render boolean true', (done) => {
  m.render(true, document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body>true</body>');
  });
});

test('render boolean false', (done) => {
  m.render(false, document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body>false</body>');
  });
});

test('render number 0', (done) => {
  m.render(0, document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body>0</body>');
  });
});

test('render number 1', (done) => {
  m.render(1, document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body>1</body>');
  });
});

test('render number', (done) => {
  m.render(100, document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body>100</body>');
  });
});

test('render div', (done) => {
  m.render(<div>hello world</div>, document.body);

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe('<body><div>hello world</div></body>');
  });
});

test('render div with children', (done) => {
  m.render(
    <div>
      <div>element 1</div>
      <div>element 2</div>
    </div>,
    document.body,
  );

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe(
      '<body><div><div>element 1</div><div>element 2</div></div></body>',
    );
  });
});

test('render fragment', (done) => {
  m.render(
    <>
      <div>element 1</div>
      <div>element 2</div>
    </>,
    document.body,
  );

  renderDone(done, () => {
    expect(document.body.outerHTML).toBe(
      '<body><div>element 1</div><div>element 2</div></body>',
    );
  });
});
