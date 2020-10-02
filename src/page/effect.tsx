// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';
import { useEffect } from '../lib/useeffect';
import { useState } from '../lib/usestate';

export function Top(): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Top rendered');
    return () => console.log('top done');
  });

  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <div
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Top Level {count}
      </div>
      <Middle />
    </>
  );
}

function Middle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Middle rendered');
    return () => console.log('middle done');
  });

  return (
    <>
      <div onClick={() => setCount((prev) => prev + 1)}>
        Middle Level {count}
      </div>
      <Bottom />
    </>
  );
}

function Bottom() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Bottom rendered');
    return () => console.log('bottom done');
  });

  return (
    <div onClick={() => setCount((prev) => prev + 1)}>Bottom Level {count}</div>
  );
}
