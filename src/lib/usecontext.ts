import { createVnode } from './vnode';

interface Context<T> {
  Provider: (attrs: ContextProvider<T>) => JSX.Element;
  value: T;
}

interface ContextProvider<T> {
  children: JSX.Element;
  value: T;
}

export const createContext = function <T>(value: T): Context<T> {
  return {
    Provider: (attrs: ContextProvider<T>): JSX.Element => {
      return createVnode('PROVIDER', { value: value }, attrs.children);
    },
    value: value,
  };
};

export const useContext = function <T>(v: Context<T>): T {
  return v.value;
};
