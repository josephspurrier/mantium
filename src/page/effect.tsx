// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';

export function Top(): JSX.Element {
  const [count, setCount] = m.useState(0);
  const [, setCount2] = m.useState(0);

  // Run only once.
  m.useEffect(() => {
    console.log('Top rendered');
    return () => console.log('top done');
  }, []);

  // Run on all redraws. Allows mulitple useEffects in a function.
  // useEffect(() => {
  //   console.log('Top (always) rendered');
  //   return () => console.log('top (always) done');
  // });

  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <div>All of the divs below are clicked to demonstration useEffect.</div>
      <div
        onClick={() => {
          m.batchState(() => {
            setCount((prev) => prev + 1);
            setCount2((prev) => prev + 1);
          });
        }}
      >
        Top Level ({count}) will only render once and will cleanup when leaving
        the page.
      </div>
      <Middle />
    </>
  );
}

function Middle() {
  const [count, setCount] = m.useState(0);

  // Only run when count changes.
  m.useEffect(() => {
    console.log('Middle rendered');
    return () => console.log('middle done');
  }, [count]);

  return (
    <>
      <div onClick={() => setCount((prev) => prev + 1)}>
        Middle Level ({count}) will render on page load, when it's state is
        changed, and on cleanup.
      </div>
      <Bottom />
    </>
  );
}

function Bottom() {
  const [count, setCount] = m.useState(0);

  // Run on any state change/redraws.
  m.useEffect(() => {
    console.log('Bottom rendered');
    return () => console.log('bottom done');
  });

  return (
    <div onClick={() => setCount((prev) => prev + 1)}>
      Bottom Level ({count}) will render on page load, when any state is
      changed, and on cleanup.
    </div>
  );
}
