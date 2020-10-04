// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../../lib/v2';

let globalCounter = 0;

export const State = (): JSX.Element => {
  const [count, setCount] = m.useState(0);
  const [count2, setCount2] = m.useState(5);

  let neverWork = 0;
  return (
    <>
      <button
        onclick={() => {
          globalCounter++;
          // Requires redraw since not using useState().
          //m.redraw();
        }}
      >
        Increment Global Variable
      </button>
      <button
        onclick={() => {
          globalCounter++;
          setCount((prev) => prev + 1);
        }}
      >
        Increment Local + Global Variable
      </button>
      <button
        onclick={() => {
          setCount2((prev) => prev + 1);
        }}
      >
        Increment Local 2
      </button>
      <button
        onclick={() => {
          console.log(
            'Variable will update in the console, but never on the page:',
            (neverWork += 1),
          );
        }}
      >
        Try Increment "Never counter" But Fail
      </button>
      <div>Global counter: {globalCounter}</div>
      <div>Local counter: {count}</div>
      <div>Local counter 2: {count2}</div>
      <div>
        Never counter: {neverWork} (Closures modifying local variables without
        'useState' won't work with DOM updates. See the Console for output).
      </div>
    </>
  );
};
