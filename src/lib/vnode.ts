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

export const createDocFragment = (
  node: string | JSX.Vnode,
): DocumentFragment => {
  const frag = document.createDocumentFragment();

  // Support functions (closures).
  const vnode = node as JSX.Vnode;
  const f = vnode.tag as (
    attrs: JSX.ElementAttrs,
    ...children: JSX.Vnode[]
  ) => JSX.Vnode;
  if (typeof f === 'function') {
    node = f({ ...vnode.attrs, children: vnode.children });
    if (Array.isArray(node)) {
      node.forEach(function (item: string[] | JSX.Vnode | JSX.Vnode[]) {
        appendChild(frag, item);
      });
      return frag;
    }
    return createDocFragment(node);
  }

  if (vnode && typeof vnode.tag === 'string') {
    if (vnode.tag === 'ROOTFRAGMENT') {
      appendChild(frag, vnode.children);
    } else {
      const elem = document.createElement(vnode.tag);
      setAttrs(elem, vnode.attrs);
      addEventListeners(elem, vnode.attrs, () => {
        redraw();
      });
      // TODO: Determine why one article suggested to use:
      // elem.appendChild.bind(elem)
      appendChild(elem, vnode.children);
      frag.appendChild(elem);
    }

    return frag;
  }

  frag.appendChild(document.createTextNode(node.toString()));
  return frag;
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
    parent.appendChild(createDocFragment(child));
  }
};
