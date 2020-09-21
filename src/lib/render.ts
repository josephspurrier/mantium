import { redraw } from '@/lib/vdom';
import { z } from '@/lib/z';

// Set the function to call to generate the Vnode and then trigger a redraw.
export const render = (
  parent: HTMLElement,
  child: string | number | boolean | (() => JSX.Element),
): void => {
  z.state.rootParent = parent;
  if (typeof child === 'function') {
    z.state.generateRawState = child as () => JSX.Element;
  } else {
    z.state.generateRawState = () => {
      return z.createElement('ROOTFRAGMENT', {}, String(child));
    };
  }
  redraw();
};
