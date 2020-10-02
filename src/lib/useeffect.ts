import { shallowEqual } from './helper';
import { currentURL } from './router';
import { state } from './state';

export const resetEffectCounter = (): void => {
  state.globalEffectCounter[currentURL()] = -1;
};

export const useEffect = (
  f: (() => () => void) | (() => void),
  when?: unknown[],
): void => {
  const url = currentURL();

  // If the global effect is empty, they initialize it.
  if (state.globalEffect[url] === undefined) {
    state.globalEffectCounter[url] = -1;
    state.globalEffect[url] = [];
  }
  state.globalEffectCounter[url]++;
  const localCounter = state.globalEffectCounter[url];

  // If this is the first call from a function, store the initial value.
  if (localCounter >= state.globalEffect[url].length) {
    state.globalEffect[url][localCounter] = {
      onCreate: f,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onDestroy: () => {},
      whenBefore: undefined,
      whenAfter: when,
    };
  } else {
    state.globalEffect[url][localCounter].whenAfter = when;
  }
};

const runLogic = (url: string, i: number, onlyClean: boolean) => {
  // Do a cleanup if one is set.
  const willDestroy = state.globalEffect[url][i].onDestroy;
  if (willDestroy !== undefined) {
    willDestroy();
  }

  if (!onlyClean) {
    // Run the function itself.
    const cleanupFunc = state.globalEffect[url][
      i
    ].onCreate() as () => () => void;
    if (typeof cleanupFunc === 'function') {
      state.globalEffect[url][i].onDestroy = cleanupFunc;
    }
  }
};

const clean = (url: string, onlyClean: boolean) => {
  if (state.globalEffect[url]) {
    const localCounter = state.globalEffect[url].length;
    for (let i = localCounter; i >= 0; i--) {
      const fun = state.globalEffect[url][i];
      if (fun) {
        //console.log('when:', fun.whenBefore, fun.whenAfter);
        if (onlyClean) {
          runLogic(url, i, onlyClean);
        } else if (fun.whenAfter === undefined) {
          // Run every time.
          runLogic(url, i, false);
        } else if (Array.isArray(fun.whenAfter) && fun.whenAfter.length === 0) {
          // Run once.
          if (
            fun.whenBefore === undefined ||
            !shallowEqual(fun.whenBefore, fun.whenAfter)
          ) {
            runLogic(url, i, false);
            fun.whenBefore = fun.whenAfter;
          }
        } else if (fun.whenBefore === undefined) {
          // Run on first run.
          runLogic(url, i, false);
          fun.whenBefore = fun.whenAfter;
        } else {
          if (!shallowEqual(fun.whenBefore, fun.whenAfter)) {
            runLogic(url, i, false);
            fun.whenBefore = fun.whenAfter;
          }
        }
      }
    }
  }
};

export const processEffects = (): void => {
  resetEffectCounter();

  // If the URL has changed, run the cleanup effects for the last page.
  if (state.lastPage !== '' && state.lastPage !== currentURL()) {
    clean(state.lastPage, true);
  }

  // Run the cleanup effects for the current page.
  clean(currentURL(), false);
};
