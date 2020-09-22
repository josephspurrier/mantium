import { redraw } from './vdom';
import { state } from './var';
import { createVnode } from './vnode';

// Set the function to call to generate the Vnode and then trigger a redraw.
export const render = (
  parent: HTMLElement,
  child: string | number | boolean | (() => JSX.Element),
): void => {
  state.rootParent = parent;
  if (typeof child === 'function') {
    state.generateRawState = child as () => JSX.Element;
  } else {
    state.generateRawState = () => {
      return createVnode('ROOTFRAGMENT', {}, String(child));
    };
  }
  redraw();
};
