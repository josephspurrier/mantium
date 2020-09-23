import { state } from './var';
import { redraw } from './vdom';

export const resetStateCounter = (): void => {
  state.globalStateCounter = -1;
};

// Use in closures to get and set the values. The first value it returns
// is the getter and the second function is the setter. Like React, it is
// ordered and it's a generic so the default value can be set as a parameters.
// Examples:
// const [isBool, setBool] = useState(false);
// const [count, setCount] = z.useState(0);
// To change state more than once, pass a function that accepts the previous
// value:
// setCount((prev: number) => prev + 1);
export const useState = function <T>(
  v: T,
): [T, (val: T | ((prevVal: T) => T)) => void] {
  state.globalStateCounter++;
  const localCounter = state.globalStateCounter;
  // If this is the first call from a function, store the initial value.
  if (localCounter >= state.globalState.length) {
    state.globalState[localCounter] = v;
  }

  return [
    // Return the value.
    state.globalState[localCounter] as T,
    // Return the setter.
    (val: T | ((prevVal: T) => T)): void => {
      if (typeof val === 'function') {
        state.globalState[localCounter] = (val as (prevVal: T) => T)(
          state.globalState[localCounter] as T,
        );
      } else {
        state.globalState[localCounter] = val;
      }

      redraw();
    },
  ];
};
