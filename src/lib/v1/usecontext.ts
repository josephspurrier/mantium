import { redraw } from './vdom';

export interface Context<T> {
  value: T;
}

export const createContext = function <T>(value: T): Context<T> {
  return {
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
