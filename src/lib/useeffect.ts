import { currentURL } from './router';
import { state } from './state';
//import { redraw } from './vdom';

export const resetEffectCounter = (): void => {
  state.globalEffectCounter[currentURL()] = -1;
};

const alreadyRan = false;

export const useEffect = (
  f: (() => () => void) | (() => void),
  when: string[] = [],
): void => {
  // If the global effect is empty, they initialize it.
  if (state.globalEffect[currentURL()] === undefined) {
    state.globalEffectCounter[currentURL()] = -1;
    state.globalEffect[currentURL()] = [];
    state.globalEffectCleanup[currentURL()] = [];
  }
  state.globalEffectCounter[currentURL()]++;
  const localCounter = state.globalEffectCounter[currentURL()];

  // If this is the first call from a function, store the initial value.
  if (localCounter >= state.globalEffect[currentURL()].length) {
    state.globalEffect[currentURL()][localCounter] = f;
  }

  //console.log('Length:', localCounter);

  if (when.length === 0) {
    if (!alreadyRan) {
      //alreadyRan = true;
      // const v = f();
      // if (typeof v === 'function') {
      //   v();
      // }
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
            //console.log('stored cleanup!');
            state.globalEffectCleanup[url][i] = cleanupFunc;
          } else {
            state.globalEffectCleanup[url][i] = () => {
              console.log('cleanup nothing');
            };
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
