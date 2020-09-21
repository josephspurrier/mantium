// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from '@/lib/z';
import { useState } from '@/lib/state';

export const BooleanFlip = (): JSX.Element => {
  const [isBool, setBool] = useState(false);
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
