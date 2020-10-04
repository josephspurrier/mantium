import { m } from '../../lib/v2';

let globalCounter = 0;

export const RedrawButtons = (): JSX.Element => {
  const [count, setCount] = m.useState(0);
  return (
    <>
      <button
        onclick={() => {
          setTimeout(() => {
            setCount((prev) => prev + 1);
          }, 1000);
        }}
      >
        1 Second Timer with setState [auto redraw] ({count} clicks)
      </button>

      <button
        onclick={() => {
          //m.redraw('manualRedraw');
        }}
      >
        Manual Redraw
      </button>

      <button
        onclick={() => {
          setTimeout(() => {
            globalCounter++;
          }, 1000);
        }}
      >
        1 Second Timer on Global Variable [requires manual redraw] (
        {globalCounter} clicks)
      </button>
    </>
  );
};
