import { z } from '@/lib/z';
import { useState } from '@/lib/state';

export const RedrawButtons = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <>
      <button
        onclick={() => {
          setTimeout(() => {
            setCount(count() + 1);
          }, 1000);
        }}
      >
        1 Second Timer without Redraw ({count()} clicks)
      </button>

      <button
        onclick={() => {
          z.redraw();
        }}
      >
        Manual Redraw
      </button>

      <button
        onclick={() => {
          setTimeout(() => {
            setCount2(count2() + 1);
            z.redraw();
          }, 1000);
        }}
      >
        1 Second Timer with Redraw ({count2()} clicks)
      </button>
    </>
  );
};
