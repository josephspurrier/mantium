import { addEventListeners, setAttrs } from './attrs';
import { redraw } from './vdom';

// Create a Vnode for the current element and children. Any fragments will
// have a tag of FRAGMENT created.
export const createVnode = (
  tag:
    | string
    | ((attrs: JSX.ElementAttrs, ...children: HTMLElement[]) => JSX.Vnode),
  attrs = {} as JSX.ElementAttrs,
  ...children: (JSX.Vnode | unknown)[]
): JSX.Vnode => {
  const getChildren = (
    arr: (JSX.Vnode | unknown)[],
  ): (JSX.Vnode | string)[] => {
    let r: (JSX.Vnode | string)[] = [];

    arr.forEach((element: unknown) => {
      if (Array.isArray(element)) {
        r = [...r, ...getChildren(element)];
      } else {
        if (element && (element as JSX.Vnode).tag) {
          r.push(element as JSX.Vnode);
        } else {
          r.push(String(element));
        }
      }
    });

    return r;
  };

  if (typeof tag === 'string') {
    return { tag, attrs: attrs || {}, children: getChildren(children) };
  }

  const node = tag({ ...attrs, children: getChildren(children) });

  if (Array.isArray(node)) {
    return {
      tag: 'FRAGMENT',
      attrs: attrs || {},
      children: getChildren(node),
    };
  }
  return node;
};

export const createElementText = (node: string): Text => {
  return document.createTextNode(node);
};

export const createDocFragment = (node: JSX.Vnode): DocumentFragment => {
  const frag = document.createDocumentFragment();
  if (node.tag === 'ROOTFRAGMENT') {
    appendChildToNode(frag, node.children);
  } else {
    const elem = document.createElement(node.tag);
    setAttrs(elem, node.attrs);
    addEventListeners(elem, node.attrs, () => {
      redraw();
    });
    // TODO: Determine why one article suggested to use:
    // elem.appendChild.bind(elem)
    appendChildToNode(elem, node.children);
    frag.appendChild(elem);
  }

  return frag;
};

const appendChildToNode = (
  parent: HTMLElement | DocumentFragment,
  child: (string | JSX.Vnode)[] | JSX.Vnode,
): void => {
  if (Array.isArray(child)) {
    child.forEach((nestedChild) => {
      if ((nestedChild as JSX.Vnode).tag) {
        appendChildToNode(parent, nestedChild as JSX.Vnode);
      } else {
        parent.appendChild(document.createTextNode(String(nestedChild)));
      }
    });
  } else {
    parent.appendChild(createDocFragment(child));
  }
};
