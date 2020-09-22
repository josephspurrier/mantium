import { state } from './var';
import { redraw } from './vdom';

export const resetStateCounter = (): void => {
  state.globalStateCounter = -1;
};

// Use in closures to get and set the values. The first function it returns
// is the getter and the second function is the setter. Like React, it is
// ordered and it's a generic so the default value can be set as a parameters.
// Examples:
// const [isBool, setBool] = useState(false);
// const [count, setCount] = z.useState(0);
export const useState = function <T>(v: T): [() => T, (val: T) => void] {
  state.globalStateCounter++;
  const localCounter = state.globalStateCounter;
  if (state.globalState[localCounter] === undefined) {
    state.globalState[localCounter] = v;
  }
  return [
    (): T => {
      return state.globalState[localCounter] as T;
    },
    (val: T): void => {
      state.globalState[localCounter] = val;
      redraw();
    },
  ];
};
