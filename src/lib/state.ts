import { RouteList } from './router';

export const state = {
  // Root element where Vnodes are rendered.
  rootParent: {} as HTMLElement,
  // Current state of the Vnode data.
  currentState: {} as JSX.Vnode,
  // Generate the new state.
  generateRawState: {} as () => JSX.Element,
  // Storage for local variables.
  globalState: [] as unknown[],
  // Counter for local variables.
  globalStateCounter: -1,
  // Router state.
  routerActive: false,
  // Router prefix.
  routerPrefix: '#',
  // List of routes.
  routes: {} as RouteList,
  // Determine if currently redrawing;
  isRedrawing: false,
  // If redrawing, then redraw again after.
  redrawAgain: false,
};
