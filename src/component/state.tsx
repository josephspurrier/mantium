// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from 'src/lib';

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
        }}
      >
        Increment Global Variable
      </button>
      <button
        onclick={() => {
          globalCounter++;
          setCount(count() + 1);
        }}
      >
        Increment Local + Global Variable
      </button>
      <button
        onclick={() => {
          setCount2(count2() + 1);
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
      <div>Local counter: {count()}</div>
      <div>Local counter 2: {count2()}</div>
      <div>
        Never counter: {neverWork} (Closures with local variables without
        'useState' won't work with DOM updates. See the Console for output).
      </div>
    </>
  );
};
