import { createElementText, createFragment } from '@/lib/vnode';
import { cleanState } from '@/lib/fragment';
import { resetStateCounter } from '@/lib/state';
import { updateAttrs } from '@/lib/attrs';
import { z } from '@/lib/z';

// Only allow redrawing once and queue up redrawing after if needed.
export const redraw = (): void => {
  // If currently redrawing, then just queue another after.
  if (z.state.isRedrawing) {
    z.state.redrawAgain = true;
    return;
  }

  z.state.isRedrawing = true;

  resetStateCounter();
  const rawDesiredState = (z.state.generateRawState() as unknown) as JSX.Vnode;
  if (!z.state.currentState.tag) {
    //console.log('early-state:', rawDesiredState);
    z.state.currentState = cleanState(rawDesiredState);
    //console.log('desired state:', z.state.currentState);
    updateElement(z.state.rootParent, z.state.currentState);
  } else {
    //console.log('early-state:', rawDesiredState);
    const desiredState = cleanState(rawDesiredState);
    //console.log('desired state:', desiredState);
    updateElement(z.state.rootParent, desiredState, z.state.currentState);
    z.state.currentState = desiredState;
  }

  z.state.isRedrawing = false;

  // If done redrawing and need to redraw again, then trigger.
  if (z.state.redrawAgain) {
    z.state.redrawAgain = false;
    redraw();
  }
};

// Accepts either a Vnode or a string and makes the changes on the DOM.
const updateElement = function (
  parent: Node,
  newNode: JSX.Vnode | string,
  oldNode?: JSX.Vnode | string,
  index = 0,
): number {
  if (oldNode === undefined) {
    if (typeof newNode === 'string') {
      parent.appendChild(createElementText(newNode));
      return 0;
    }
    parent.appendChild(createFragment(newNode));
  } else if (newNode === undefined) {
    parent.removeChild(parent.childNodes[index]);
    return 1;
  } else if (typeof newNode === 'string' && typeof oldNode === 'string') {
    if (newNode !== oldNode) {
      parent.replaceChild(createElementText(newNode), parent.childNodes[index]);
    }
  } else if (changed(newNode, oldNode)) {
    if (typeof newNode === 'string') {
      parent.replaceChild(createElementText(newNode), parent.childNodes[index]);
    } else {
      parent.replaceChild(createFragment(newNode), parent.childNodes[index]);
    }
  } else {
    const newVnode = newNode as JSX.Vnode;
    const oldVnode = oldNode as JSX.Vnode;

    updateAttrs(parent.childNodes[index], newVnode.attrs, oldVnode.attrs);
    const newLength = newVnode.children.length;
    const oldLength = oldVnode.children.length;

    // Keep track of the deleted nodes.
    let deleted = 0;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      deleted += updateElement(
        newVnode.tag === 'ROOTFRAGMENT' || oldVnode.tag === 'ROOTFRAGMENT'
          ? parent
          : parent.childNodes[index],
        newVnode.children[i],
        oldVnode.children[i],
        i - deleted,
      );
    }
  }

  return 0;
};

const changed = function (
  node1: JSX.Vnode | string,
  node2: JSX.Vnode | string,
) {
  if (typeof node1 !== typeof node2) {
    return true;
  } else if (
    (node1 as JSX.Vnode) &&
    (node1 as JSX.Vnode).attrs &&
    (node1 as JSX.Vnode).attrs.forceUpdate
  ) {
    return true;
  } else if (typeof node1 === 'string' && node1 !== node2) {
    return true;
  } else if (typeof node1 !== 'string' && typeof node2 !== 'string') {
    if (node1.tag !== node2.tag) {
      return true;
    }
    return false;
  }

  return false;
};

export const appendChild = (
  parent: HTMLElement | DocumentFragment,
  child: (string | JSX.Vnode)[] | JSX.Vnode,
): void => {
  if (Array.isArray(child)) {
    child.forEach((nestedChild) => {
      if ((nestedChild as JSX.Vnode).tag) {
        appendChild(parent, nestedChild as JSX.Vnode);
      } else {
        parent.appendChild(document.createTextNode(String(nestedChild)));
      }
    });
  } else {
    parent.appendChild(createFragment(child));
  }
};
