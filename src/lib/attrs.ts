import { redraw } from '@/lib/vdom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setSingleAttr = (elem: Node, name: string, value: any): void => {
  if (isCustomAttrs(name)) {
    return;
  } else if (name === 'className') {
    (elem as HTMLElement).setAttribute('class', value);
  } else if (value === true) {
    // Add attributes that are boolean so they don't have a value, only a name.
    (elem as HTMLElement).setAttribute(name, '');
  } else if (value === false || value === null || value === undefined) {
    // Skip attributes that are: false, null, undefined.
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    (elem as HTMLElement).setAttribute(name, value.toString());
  }
};

export const setAttrs = (elem: HTMLElement, attrs: JSX.ElementAttrs): void => {
  Object.keys(attrs).forEach((name) => {
    // eslint-disable-next-line no-prototype-builtins
    if (attrs.hasOwnProperty(name)) {
      setSingleAttr(elem, name, attrs[name]);
    }
  });
};

const removeBooleanAttrs = (elem: HTMLElement, name: string) => {
  elem.removeAttribute(name);
  // TODO: Determine if I need to remove elements like this:
  // elem[name] = false;
};

const isEventAttrs = (name: string) => {
  return /^on/.test(name);
};

const extractEventName = (name: string) => {
  return name.slice(2).toLowerCase();
};

export const addEventListeners = (
  elem: HTMLElement,
  attrs: JSX.ElementAttrs,
): void => {
  Object.keys(attrs).forEach((name) => {
    if (isEventAttrs(name)) {
      elem.addEventListener(extractEventName(name), attrs[name]);
      elem.addEventListener(extractEventName(name), () => {
        // Force a redraw when buttons are clicked.
        // TODO: Don't think we need a delay here (mayb a 0 second one).
        // TODO: See if this is the best way to do redraws because it would
        // be good to wait until the listener is finished. Maybe a race
        // condition.
        redraw();
      });
    }
  });
};

const isCustomAttrs = (name: string) => {
  return isEventAttrs(name) || name === 'forceUpdate';
};

const updateSingleAttr = (
  elem: Node,
  name: string,
  newVal: unknown,
  oldVal: unknown,
): void => {
  if (!newVal) {
    removeAttrs(elem, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setSingleAttr(elem, name, newVal);
  }
};

export const updateAttrs = (
  elem: Node,
  newAttrs: JSX.ElementAttrs,
  oldAttrs: JSX.ElementAttrs = {},
): void => {
  const Attrss = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(Attrss).forEach((name) => {
    updateSingleAttr(elem, name, newAttrs[name], oldAttrs[name]);
  });
};

const removeAttrs = (elem: Node, name: string, value: unknown) => {
  if (isCustomAttrs(name)) {
    return;
  } else if (name === 'className') {
    (elem as HTMLElement).removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanAttrs(elem as HTMLElement, name);
  } else {
    (elem as HTMLElement).removeAttribute(name);
  }
};
