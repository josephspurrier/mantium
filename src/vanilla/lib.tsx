export interface ElementAttrs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any;
}

const appendChild = (
  parent: HTMLElement | DocumentFragment,
  child: DocumentFragment,
) => {
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  else
    parent.appendChild(
      child.nodeType ? child : document.createTextNode(child.toString()),
    );
};

export const z = {
  fragment: function (attrs: {
    children: DocumentFragment[];
  }): DocumentFragment[] {
    return attrs.children;
  },
  createElement: function (
    tag:
      | string
      | ((
          attrs: ElementAttrs,
          ...children: DocumentFragment[]
        ) => DocumentFragment)
      | ((attrs: { children: DocumentFragment[] }) => DocumentFragment[]),
    attrs: ElementAttrs,
    ...children: DocumentFragment[]
  ): DocumentFragment {
    // Create the document fragment.
    const frag = document.createDocumentFragment();

    // Support functions (closures). This could be a functional component or a
    // fragment function.
    if (typeof tag === 'function') {
      const fragOrArray = tag({ ...attrs, children: children });
      if (Array.isArray(fragOrArray)) {
        fragOrArray.forEach((child) => {
          appendChild(frag, child);
        });
        return frag;
      }
      return fragOrArray;
    }

    // Create the element.
    const elem = document.createElement(tag);

    // Apply the attributes and event listeners.
    Object.entries(attrs || {}).forEach(([name, value]) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!attrs.hasOwnProperty(name)) {
        // Skip properties that are inherited.
      } else if (name.startsWith('on') && name.toLowerCase() in window) {
        // Add event listeners for those that are available in the window.
        elem.addEventListener(name.toLowerCase().substr(2), value);
      } else if (value === true) {
        // Add attributes that are boolean so they don't have a value, only a name.
        elem.setAttribute(name, '');
      } else if (value === false || value === null || value === undefined) {
        // Skip attributes that are: false, null, undefined.
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        elem.setAttribute(name, value.toString());
      }
    });

    // Append each child (recursive).
    children.forEach((child) => {
      appendChild(elem, child);
    });
    frag.appendChild(elem);

    return frag;
  },
  render: function (
    parent: HTMLElement,
    child: string | (() => JSX.Element),
    replace = false,
  ): void {
    if (typeof child === 'function') {
      const childElem = (child() as unknown) as HTMLDivElement;
      if (replace) {
        parent.replaceWith(childElem);
      } else {
        parent.appendChild(childElem);
      }
      return;
    }

    if (replace) {
      parent.replaceWith(document.createTextNode(child.toString()));
    } else {
      parent.appendChild(document.createTextNode(child.toString()));
    }
  },
};
