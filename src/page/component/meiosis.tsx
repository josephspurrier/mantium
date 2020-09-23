// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../../lib';

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
        }}
      >
        Add
      </button>
      <button
        onclick={() => {
          actions.dec();
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
