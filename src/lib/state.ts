import { z } from '@/lib/z';

export const resetStateCounter = (): void => {
  z.state.globalStateCounter = -1;
};

// Use in closures to get and set the values. The first function it returns
// is the getter and the second function is the setter. Like React, it is
// ordered and it's a generic so the default value can be set as a parameters.
// Examples:
// const [isBool, setBool] = useState(false);
// const [count, setCount] = z.useState(0);
export const useState = function <T>(v: T): [() => T, (val: T) => void] {
  z.state.globalStateCounter++;
  const localCounter = z.state.globalStateCounter;
  if (z.state.globalState[localCounter] === undefined) {
    z.state.globalState[localCounter] = v;
  }
  return [
    (): T => {
      return z.state.globalState[localCounter] as T;
    },
    (val: T): void => {
      z.state.globalState[localCounter] = val;
      z.redraw();
    },
  ];
};
