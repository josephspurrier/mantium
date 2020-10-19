import { createElementText, createDocFragment } from './vnode';
import { cleanState } from './fragment';
import { resetStateCounter } from './helper';
import { updateAttrs } from './attrs';
import { state } from './state';
import { processEffects } from './useeffect';
import { shallowEqual } from './helper';

// Redraw, but watch out for loops.
export const redraw = (origin = ''): void => {
  // If in batch state, then don't redraw right now.
  if (state.isBatchingState) {
    state.redrawAfterBatch = true;
    return;
  }

  // Don't allow a redraw if the page is still rendering.
  if (state.isRendering && origin !== 'render') {
    console.warn(
      'Should not be redrawing before the page is done loading. ' +
        'Ensure there is no call that triggers a redraw like a call to a ' +
        ' useState setter outside of a useEffect(). ' +
        'Redraw skipped.',
    );
    return;
  }

  // If currently redrawing, then warn about redrawing and return;
  if (state.isRedrawing) {
    console.warn(
      'Should not be calling redraw() inside of an event that triggers a ' +
        'redraw(). Redraw skipped.',
    );
    return;
  }

  state.isRedrawing = true;

  resetStateCounter();
  const rawDesiredState = (state.generateRawState() as unknown) as JSX.Vnode;
  //console.log('Redraw:', rawDesiredState, state.rootParent);
  if (!state.currentState.tag) {
    state.currentState = cleanState(rawDesiredState);
    updateElement(state.rootParent, state.currentState);
  } else {
    const desiredState = cleanState(rawDesiredState);
    updateElement(state.rootParent, desiredState, state.currentState);
    state.currentState = desiredState;
  }

  state.isRedrawing = false;

  // If done redrawing and need to redraw again, then trigger.
  if (state.redrawAgain) {
    state.redrawAgain = false;
    redraw('redrawAgain');
  }

  // Run the effects.
  processEffects();
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
    } else {
      parent.appendChild(createDocFragment(newNode));
    }
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
      parent.replaceChild(createDocFragment(newNode), parent.childNodes[index]);
    }
  } else {
    const newVnode = newNode as JSX.Vnode;
    const oldVnode = oldNode as JSX.Vnode;

    //console.log('Update:', parent.childNodes, oldVnode, newVnode);
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
    // If the nodes types are different, then they changed.
    return true;
  } else if (typeof node1 !== 'string' && typeof node2 !== 'string') {
    // If the nodes are vnodes
    if (node1.attrs && node1.attrs.forceUpdate) {
      return true;
    } else if (node1.tag !== node2.tag) {
      return true;
    } else if (!shallowEqual(node1.attrs, node2.attrs)) {
      // FIXME: I don't think this should be here. If the attributes are different, then that's fine, it shouldn't do a replace.
      return true;
    }
  }

  return false;
};
