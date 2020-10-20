import { state } from './state';

export const resetStateCounter = (): void => {
  state.globalStateCounter[currentURL()] = -1;
};

export const currentURL = (): string => {
  let url = window.location.hash.slice(1) || '/';
  if (state.routerPrefix === '') {
    url = window.location.pathname;
  }
  return url;
};

export const shallowEqual = (
  object1: JSX.ElementAttrs,
  object2: JSX.ElementAttrs,
): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (String(object1[key]) !== String(object2[key])) {
      return false;
    }
  }

  return true;
};
