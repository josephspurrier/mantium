import { currentURL } from './router';
import { state } from './state';

export const resetEffectCounter = (): void => {
  state.globalEffectCounter[currentURL()] = -1;
};

export const useEffect = (
  f: (() => () => void) | (() => void),
  when: string[] = [],
): void => {
  const url = currentURL();

  // If the global effect is empty, they initialize it.
  if (state.globalEffect[url] === undefined) {
    state.globalEffectCounter[url] = -1;
    state.globalEffect[url] = [];
    state.globalEffectCleanup[url] = [];
  }
  state.globalEffectCounter[url]++;
  const localCounter = state.globalEffectCounter[url];

  // If this is the first call from a function, store the initial value.
  if (localCounter >= state.globalEffect[url].length) {
    state.globalEffect[url][localCounter] = f;
  } else {
    if (when.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      state.globalEffect[url][localCounter] = () => {};
    }
  }
};

const clean = (url: string, onlyClean: boolean) => {
  if (state.globalEffect[url]) {
    const localCounter = state.globalEffect[url].length;
    for (let i = localCounter; i >= 0; i--) {
      const fun = state.globalEffect[url][i];
      if (typeof fun === 'function') {
        // Do a cleanup if one is set.
        const doesExist = state.globalEffectCleanup[url][i];
        if (doesExist !== undefined) {
          doesExist();
        }

        if (!onlyClean) {
          // Run the function itself.
          const cleanupFunc = fun() as () => () => void;
          if (typeof cleanupFunc === 'function') {
            state.globalEffectCleanup[url][i] = cleanupFunc;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            state.globalEffectCleanup[url][i] = () => {};
          }
        }
      }
    }
  }
};

// FIXME: Don't do a cleanup on a rerender if the function itself is not set.
export const processEffects = (): void => {
  resetEffectCounter();

  // If the URL has changed, run the cleanup effects for the last page.
  if (state.lastPage !== '' && state.lastPage !== currentURL()) {
    clean(state.lastPage, true);
  }

  // Run the cleanup effects for the current page.
  clean(currentURL(), false);
};
