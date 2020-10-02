import { RouteList } from './router';

export interface useStateData {
  [property: string]: unknown[];
}

export interface useStateCounter {
  [property: string]: number;
}

export interface useEffectData {
  [property: string]: ((() => () => void) | (() => void))[];
}

export interface useEffectCounter {
  [property: string]: number;
}

export interface LibraryState {
  // Root element where Vnodes are rendered.
  rootParent: HTMLElement;
  // Current state of the Vnode data.
  currentState: JSX.Vnode;
  // Generate the new state.
  generateRawState: () => JSX.Element;
  // Storage for useEffect.
  globalState: useStateData;
  // Counter for useState.
  globalStateCounter: useStateCounter;
  // Storage for useEffect.
  globalEffect: useEffectData;
  // Storage for useEffect.
  globalEffectCleanup: useEffectData;
  // Counter for useEffect.
  globalEffectCounter: useEffectCounter;
  // Router state.
  routerActive: boolean;
  // Router prefix.
  routerPrefix: string;
  // List of routes.
  routes: RouteList;
  // Last page.
  lastPage: string;
  // Determine if currently redrawing;
  isRedrawing: boolean;
  // If redrawing, then redraw again after.
  redrawAgain: boolean;
  // Redraw counter to ensure loops don't occur.
  redrawCounter: number;
  // Tracking when rendering.
  isRendering: boolean;
}

const newState = (): LibraryState => {
  return {
    rootParent: {} as HTMLElement,
    currentState: {} as JSX.Vnode,
    generateRawState: {} as () => JSX.Element,
    globalState: {} as useStateData,
    globalStateCounter: {} as useStateCounter,
    globalEffect: {} as useEffectData,
    globalEffectCleanup: {} as useEffectData,
    globalEffectCounter: {} as useEffectCounter,
    routerActive: false,
    routerPrefix: '#',
    routes: {} as RouteList,
    lastPage: '',
    isRedrawing: false,
    redrawAgain: false,
    redrawCounter: 0,
    isRendering: false,
  };
};

export let state = newState();

export const resetState = (): void => {
  state = newState();
};
