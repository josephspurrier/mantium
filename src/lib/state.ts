import { RouteList } from './router';

export interface LibraryState {
  // Root element where Vnodes are rendered.
  rootParent: HTMLElement;
  // Current state of the Vnode data.
  currentState: JSX.Vnode;
  // Generate the new state.
  generateRawState: () => JSX.Element;
  // Storage for local variables.
  globalState: unknown[];
  // Counter for local variables.
  globalStateCounter: number;
  // Router state.
  routerActive: boolean;
  // Router prefix.
  routerPrefix: string;
  // List of routes.
  routes: RouteList;
  // Determine if currently redrawing;
  isRedrawing: boolean;
  // If redrawing, then redraw again after.
  redrawAgain: boolean;
}

const newState = (): LibraryState => {
  return {
    rootParent: {} as HTMLElement,
    currentState: {} as JSX.Vnode,
    generateRawState: {} as () => JSX.Element,
    globalState: [] as unknown[],
    globalStateCounter: -1,
    routerActive: false,
    routerPrefix: '#',
    routes: {} as RouteList,
    isRedrawing: false,
    redrawAgain: false,
  };
};

export let state = newState();

export const resetState = (): void => {
  state = newState();
};
