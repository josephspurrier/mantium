import { currentURL } from './router';
import { state } from './state';
import { redraw } from './vdom';

export const resetStateCounter = (): void => {
  state.globalStateCounter[currentURL()] = -1;
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
  if (state.globalState[currentURL()] === undefined) {
    state.globalStateCounter[currentURL()] = -1;
    state.globalState[currentURL()] = [];
  }
  state.globalStateCounter[currentURL()]++;
  const localCounter = state.globalStateCounter[currentURL()];
  // If this is the first call from a function, store the initial value.
  if (localCounter >= state.globalState[currentURL()].length) {
    state.globalState[currentURL()][localCounter] = v;
  }

  return [
    // Return the value.
    state.globalState[currentURL()][localCounter] as T,
    // Return the setter.
    (val: T | ((prevVal: T) => T)): void => {
      if (typeof val === 'function') {
        state.globalState[currentURL()][localCounter] = (val as (
          prevVal: T,
        ) => T)(state.globalState[currentURL()][localCounter] as T);
      } else {
        state.globalState[currentURL()][localCounter] = val;
      }

      redraw();
    },
  ];
};
