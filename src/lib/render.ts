import { redraw } from './vdom';
import { state } from './state';
import { createVnode } from './vnode';

// Set the function to call to generate the Vnode and then trigger a redraw.
export const render = (
  parent: HTMLElement,
  child: string | number | boolean | (() => JSX.Element),
): void => {
  if (state.isRendering) {
    console.warn('Should not be calling render() from inside of render().');
    return;
  }
  state.rootParent = parent;
  if (typeof child === 'function') {
    state.generateRawState = child as () => JSX.Element;
  } else {
    state.generateRawState = () => {
      return createVnode('ROOTFRAGMENT', {}, String(child));
    };
  }
  state.redrawCounter = 0;
  state.isRendering = true;
  redraw('render');
  state.isRendering = false;
  state.redrawCounter = 0;
};
