// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../../lib/v2';

export const BooleanFlip = (): JSX.Element => {
  const [isBool, setBool] = m.useState(false);
  return (
    <div>
      <button
        onclick={() => {
          console.log('Bool value:', isBool);
          setBool((prev) => !prev);
        }}
      >
        Change Boolean Value
      </button>
      <div>Current value: {isBool}</div>
    </div>
  );
};
