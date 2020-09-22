// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../../lib';

export const BooleanFlip = (): JSX.Element => {
  const [isBool, setBool] = m.useState(false);
  return (
    <>
      <button
        onclick={() => {
          setBool(!isBool());
        }}
      >
        Change Boolean Value
      </button>
      <div>Current value: {isBool()}</div>
    </>
  );
};
