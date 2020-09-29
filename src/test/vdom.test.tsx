import { m } from '../lib';

const FragLevel2 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 2.</div>
    </>
  );
};

test('render different nodes', () => {
  // Render fragment.
  m.render(document.body, () => {
    return (
      <>
        <div>Fragment level 1.</div>
        <FragLevel2 />
      </>
    );
  });
  expect(document.body.outerHTML).toBe(
    '<body><div>Fragment level 1.</div><div>Fragment level 2.</div></body>',
  );

  // Remove one of the elements.
  m.render(document.body, () => {
    return (
      <>
        <div>Fragment level 1.</div>
      </>
    );
  });
  expect(document.body.outerHTML).toBe(
    '<body><div>Fragment level 1.</div></body>',
  );

  // Add a text element.
  m.render(document.body, () => {
    return (
      <>
        <div>Fragment level 1.</div>
        Text
      </>
    );
  });
  expect(document.body.outerHTML).toBe(
    '<body><div>Fragment level 1.</div>Text</body>',
  );

  // Change the div element to a text element.
  m.render(document.body, () => {
    return <>Before Text</>;
  });
  expect(document.body.outerHTML).toBe('<body>Before Text</body>');
});

test('render different nodes', () => {
  m.render(document.body, () => {
    return (
      <>
        <div name='foo'>Before Text</div>
      </>
    );
  });
  expect(document.body.outerHTML).toBe(
    '<body><div name="foo">Before Text</div></body>',
  );

  // Exclude force update, but perform an update.
  m.render(document.body, () => {
    return (
      <>
        <div name='bar' forceUpdate='true'>
          Before Text
        </div>
      </>
    );
  });
  expect(document.body.outerHTML).toBe(
    '<body><div name="bar">Before Text</div></body>',
  );
});
