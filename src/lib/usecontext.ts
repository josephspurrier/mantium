import { redraw } from './vdom';
//import { createVnode } from './vnode';

export interface Context<T> {
  //Provider: (attrs: ContextProvider<T>) => JSX.Element;
  value: T;
}

// interface ContextProvider<T> {
//   children: JSX.Element | JSX.Element[];
//   value: T;
// }

export const createContext = function <T>(value: T): Context<T> {
  return {
    // Provider: (attrs: ContextProvider<T>): JSX.Element => {
    //   return createVnode('FRAGMENT', { value: value }, attrs.children);
    // },
    value: value,
  };
};

export const useContext = function <T>(v: Context<T>): [T, (value: T) => void] {
  return [
    v.value,
    (value: T) => {
      v.value = value;
      redraw('useContext');
    },
  ];
};
