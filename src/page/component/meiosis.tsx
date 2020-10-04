// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../../lib/v2';

interface StateAttrs {
  count: number;
  sqr: number;
}

const State = (): StateAttrs => ({
  count: 0,
  sqr: 0,
});

const Actions = (
  S: StateAttrs,
  A = {
    sqr: () => (S.sqr = S.count ** 2),
    inc: () => {
      S.count++;
      A.sqr();
    },
    dec: () => {
      S.count--;
      A.sqr();
    },
  },
) => A;

export const Meiosis = (): JSX.Element => {
  const [state] = m.useState(State());
  const [actions] = m.useState(Actions(state));

  return (
    <>
      <button
        onclick={() => {
          actions.inc();
          // Requires redraw if not interacting with useState setter directly.
          //m.redraw();
        }}
      >
        Add
      </button>
      <button
        onclick={() => {
          actions.dec();
          // Requires redraw if not interacting with useState setter directly.
          //m.redraw();
        }}
      >
        Subtract
      </button>
      <div>
        Current value: {state.count} | Squared: {state.sqr}
      </div>
    </>
  );
};
