// If true, then will output verbose console.log messages.
let verbose = false;

function setVerbose(value: boolean): void {
  verbose = value;
}

// If false, then will stop the requestIdleCallback loop.
let runWork = true;

function setWorkMode(value: boolean): void {
  runWork = value;
}

// Function that commits the work to the dom.
let commitWorkFunc = commitRoot;

function setCommitWorkFunc(
  value: (deletes: Fiber[], wip: Fiber) => void,
): void {
  commitWorkFunc = value;
}

function resetCommitWorkFunc(): void {
  commitWorkFunc = commitRoot;
}

const config = {
  setVerbose,
  setWorkMode,
  setCommitWorkFunc,
  resetCommitWorkFunc,
};

export const m = {
  createElement,
  createFragment,
  render,
  renderNow,
  useState,
  redraw,
  route,
  rendered,
  config,
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = MNode;
    interface ElementAttrs {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [property: string]: any;
    }
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elemName: string]: any;
    }
    interface ElementChildrenAttribute {
      // eslint-disable-next-line @typescript-eslint/ban-types
      children: {}; // specify children name to use
    }
  }
}

interface Props {
  children?: MNode[];
  [elemName: string]: unknown;
}

interface MNode {
  type: string | ((props: Props) => MNode);
  props: Props;
}

export interface Fiber {
  type?: string | ((props: Props) => MNode);
  dom?: HTMLElement | DocumentFragment | Text;
  props: Props;
  // We also add the alternate property to every fiber. This property is a
  // link to the old fiber, the fiber that we committed to the DOM in the previous commit phase.
  alternate?: Fiber;
  parent?: Fiber;
  sibling?: Fiber;
  child?: Fiber;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hooks?: Hook<any>[];
  effectTag?: string;
}

interface Hook<T> {
  initial: T;
  state: T;
  queue: ((value: T) => T)[];
}

let currentRoot: Fiber | undefined;
let nextUnitOfWork: Fiber | undefined;
let wipRoot: Fiber | undefined;
let deletions = [] as Fiber[];
let wipFiber: Fiber | undefined;
let hookIndex = 0;

requestIdleCallback(workLoop);

function createElement(
  type: string,
  props = {} as Props,
  ...children: (MNode | string)[]
): MNode {
  const getChildren = (arr: (MNode | unknown)[]): MNode[] => {
    let r: MNode[] = [];

    arr.forEach((element: unknown) => {
      if (Array.isArray(element)) {
        r = [...r, ...getChildren(element)];
      } else {
        if (element && (element as MNode).type) {
          r.push(element as MNode);
        } else {
          if (typeof element === 'object') {
            console.warn(
              'Found an invalid object to render. It should be either text or a MNode.',
              element,
            );
          }

          r.push(createTextElement(String(element)));
        }
      }
    });

    return r;
  };

  return {
    type,
    props: {
      ...props,
      children: getChildren(children),
    },
  };
}

function createFragment(props: Props): MNode {
  return {
    type: 'FRAGMENT',
    props: {
      children: props.children,
    },
  };
}

function createTextElement(text: string): MNode {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(fiber: Fiber): HTMLElement | DocumentFragment | Text {
  //TODO: I added this "as string".
  let dom: HTMLElement | Text | DocumentFragment;
  switch (fiber.type) {
    case 'TEXT_ELEMENT': {
      dom = document.createTextNode('');
      break;
    }
    // case undefined: {
    //   console.log('YOU SHOULD NEVER SEE THIS.', fiber);
    //   //dom = document.createDocumentFragment();
    //   //dom = document.createElement(fiber.type as string);
    //   break;
    // }
    default: {
      dom = document.createElement(fiber.type as string);
      break;
    }
  }

  updateDom(dom, {}, fiber.props);

  return dom;
}

const isEvent = (key: string) => key.startsWith('on');
const isProperty = (key: string) => key !== 'children' && !isEvent(key);
const isNew = (prev: Props, next: Props) => (key: string) => {
  return prev[key] !== next[key];
};
const isGone = (prev: Props, next: Props) => (key: string) => !(key in next);

function updateDom(
  dom: HTMLElement | DocumentFragment | Text,
  prevProps: Props,
  nextProps: Props,
) {
  //console.log('prop change:', prevProps, nextProps);
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      // TODO: I added this check because it could be null?
      if (prevProps[name]) {
        dom.removeEventListener(eventType, prevProps[name] as () => void);
      }
    });

  // TODO: I added this checked.
  if (dom instanceof HTMLElement) {
    // Remove old properties
    Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps))
      .forEach((name) => {
        //dom[name] = '';
        //console.log('remove key');
        dom.setAttribute(name, '');
      });
    //console.log('nextProps', nextProps);
    // Set new or changed properties
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        // console.log('change key');
        dom.setAttribute(name, String(nextProps[name]));
      });
  } else if (dom instanceof Text) {
    // Else just set the node value.
    if (nextProps.nodeValue !== prevProps.nodeValue) {
      dom.nodeValue = nextProps.nodeValue as string;
    }
  }

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name] as () => void);
    });
}

function commitRoot(deletes: Fiber[], wip: Fiber) {
  if (verbose) console.log('CommitRoot:', wip);

  // Process each deletion, but don't process siblings.
  deletes.forEach((fiber: Fiber) => {
    if (fiber.dom) {
      commitWork(fiber, false);
    } else {
      console.log('Found fragment on delete');
      commitWork(fiber, true);
    }
  });

  if (wip) {
    commitWork(wip.child, false);
  }
  currentRoot = wip;
  wipRoot = undefined;
}

function commitWork(fiber: Fiber | undefined, sibling: boolean) {
  if (!fiber) {
    return;
  }

  let domParentFiber = fiber.parent;

  // For the fiber that was passed (and it could be a deletion), get the parent
  // and if the parent doesn't have a dom, then get the grandparent, and
  // continue upwards until a dom is found.
  if (domParentFiber) {
    while (domParentFiber && !domParentFiber.dom) {
      domParentFiber = domParentFiber.parent;
    }

    // Once a parent is found with a dom, check the fiber tag to see what
    // operation needs to be handled on it.
    const domParent = domParentFiber && domParentFiber.dom;
    if (domParent) {
      if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
        // TODO: I added this check.
        if (domParent) {
          domParent.appendChild(fiber.dom);
        } else {
          console.log('MISSING PARENT!');
        }
      } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
        // TODO: I added this check.
        if (fiber.alternate) {
          updateDom(fiber.dom, fiber.alternate.props, fiber.props);
        } else {
          console.log('MISSING ALTERNATVE!');
        }
        domParent.appendChild(fiber.dom);
      } else if (fiber.effectTag === 'DELETION') {
        // TODO: I added this check.
        if (domParent) {
          commitDeletion(fiber, domParent, sibling);
        } else {
          console.log('MISSING DOMPARENT!');
        }
        return;
      }
      commitWork(fiber.child, false);
      commitWork(fiber.sibling, false);
    }
  }
}

function commitDeletion(
  fiber: Fiber,
  domParent: HTMLElement | DocumentFragment | Text,
  sibling: boolean,
) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    if (fiber.child) {
      commitDeletion(fiber.child, domParent, true);
    }
  }
  if (sibling && fiber.sibling) {
    commitDeletion(fiber.sibling, domParent, true);
  }
}

function renderNow(element: MNode, container: HTMLElement): void {
  if (element.type === 'TEXT_ELEMENT') {
    const dom = document.createTextNode('');
    if (element.props.nodeValue) {
      dom.nodeValue = element.props.nodeValue as string;
    }
    container.appendChild(dom);
  } else if (element.type === 'FRAGMENT') {
    if (element.props.children) {
      element.props.children.forEach((child) => renderNow(child, container));
    }
  } else if (element.type instanceof Function) {
    const mnode = element.type(element.props);
    renderNow(mnode, container);
  } else {
    const dom = document.createElement(element.type);

    const isProperty = (key: string) => key !== 'children';
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((name) => {
        dom.setAttribute(name, String(element.props[name]));
      });

    if (element.props.children) {
      element.props.children.forEach((child) => renderNow(child, dom));
    }
    container.appendChild(dom);
  }
}

let workDone = false;

function render(
  rawElement: MNode | string | number | boolean,
  container: HTMLElement,
): void {
  workDone = false;

  let element: MNode;
  if ((rawElement as MNode).props || (rawElement as MNode).type) {
    element = rawElement as MNode;
  } else {
    element = createElement('FRAGMENT', {}, String(rawElement));
  }

  if (currentRoot) {
    // Redraw.
    wipRoot = {
      dom: currentRoot.dom,
      props: {
        children: [element],
      },
      alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
  } else {
    // First draw.
    rootParent = container;
    wipRoot = {
      dom: container,
      props: {
        children: [element],
      },
      alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
  }
}

let renderedCallback: () => void;

function rendered(callback: () => void): void {
  renderedCallback = callback;
}

function workLoop(deadline: IdleDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    // FIXME: Delete this, it's just to see how often it runs.
    if (wipRoot) {
      //console.log('wipRoot:', wipRoot);
    }
    commitWorkFunc(deletions, wipRoot);
  } else {
    if (!workDone) {
      workDone = true;
      if (renderedCallback) renderedCallback();
    }
  }

  if (runWork) requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: Fiber): Fiber | undefined {
  //console.log('performWork:', fiber);
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    //console.log('funccomponent:', fiber);
    updateFunctionComponent(fiber);
  } else {
    //console.log('beforeHost:', fiber);
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | undefined = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function updateFunctionComponent(fiber: Fiber) {
  const fun = fiber.type as (props: Props) => MNode;
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fun(fiber.props)] as MNode[];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // TODO: I added this because if children are null, then nothing will happen.
  if (fiber.props.children) {
    reconcileChildren(fiber, fiber.props.children);
  }
}

function reconcileChildren(
  curFiber: Fiber,
  elements: MNode[],
): [Fiber | undefined, Fiber | undefined] {
  let index = 0;
  let oldFiber = curFiber.alternate && curFiber.alternate.child;
  let firstSibling: Fiber | undefined;
  let prevSibling: Fiber | undefined;

  //console.log('Old fiber:', oldFiber);

  while (index < elements.length || oldFiber !== undefined) {
    const element = elements[index];
    let newFiber: Fiber | undefined;

    // if (index >= elements.length) {
    //   return [newFiber, newFiber];
    // }

    // Handle fragments.
    //console.log('element:', curFiber, elements, elements.length, index);
    if (element && element.type === 'FRAGMENT') {
      if (verbose) console.log('FRAGMENT!');
      if (element.props.children) {
        const [firstSib, lastSibling] = reconcileChildren(
          curFiber,
          element.props.children,
        );
        if (index === 0) {
          curFiber.child = firstSib;
        }
        prevSibling = lastSibling;

        // TODO: Not sure if this needs to be here on an update?
        // if (oldFiber) {
        //   oldFiber = oldFiber.sibling;
        // }
        oldFiber = undefined;
      }
    } else {
      const sameType = oldFiber && element && element.type == oldFiber.type;

      // If the fiber already exists, then just update it.
      if (oldFiber && sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          parent: curFiber,
          alternate: oldFiber,
          effectTag: 'UPDATE',
        };
      }

      // If the fiber doesn't exist yet, set it to create.
      if (element && !sameType) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: undefined,
          parent: curFiber,
          alternate: undefined,
          effectTag: 'PLACEMENT',
        };
      }

      // If the fiber already exists and is a different type, delete it.
      if (oldFiber && !sameType) {
        oldFiber.effectTag = 'DELETION';
        deletions.push(oldFiber);
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }

      if (index === 0) {
        curFiber.child = newFiber;
        firstSibling = newFiber;
      } else if (element) {
        // TODO: Added this check because the sibling could be null.
        if (prevSibling) {
          prevSibling.sibling = newFiber;
        }
      }

      prevSibling = newFiber;
    }
    index++;
  }

  // Return the first and last sibling.
  return [firstSibling, prevSibling];
}

// export const shallowEqual = (
//   object1: JSX.ElementAttrs,
//   object2: JSX.ElementAttrs,
// ): boolean => {
//   const keys1 = Object.keys(object1);
//   const keys2 = Object.keys(object2);

//   if (keys1.length !== keys2.length) {
//     return false;
//   }

//   for (const key of keys1) {
//     if (String(object1[key]) !== String(object2[key])) {
//       return false;
//     }
//   }

//   return true;
// };

function useState<T>(initial: T): [T, (action: (prevVal: T) => T) => void] {
  const oldHook =
    wipFiber &&
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook: Hook<T> = {
    initial: initial,
    state: oldHook ? (oldHook.state as T) : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state) as T;
  });

  // TODO: This only looks like it supports a function, but we'll work with it for now.
  function setState(action: (prev: T) => T): void {
    hook.queue.push(action);
    redraw('setState');
  }

  // TODO: I added this, may need to see if the index should be in or out.
  if (wipFiber) {
    // TODO: I added this too.
    if (!wipFiber.hooks) {
      wipFiber.hooks = [];
    }
    // TODO: This looks weird.
    wipFiber.hooks.push(hook);
    hookIndex++;
  }

  return [hook.state, setState];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function redraw(origin = ''): void {
  //console.log('redraw:', origin);

  // TODO: I added this on currentRoot.
  if (currentRoot) {
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
  }
  if (verbose) console.log('Redraw WipRoot:', wipRoot);
  nextUnitOfWork = wipRoot;
  deletions = [];
}

export interface RouteList {
  [property: string]: () => JSX.Element;
}

let rootParent: HTMLElement;
let routerActive = false;

// Define a route.
function route(
  parent: HTMLElement,
  path: string,
  template: () => JSX.Element,
): () => JSX.Element {
  rootParent = parent;

  // Register the router event listeners.
  if (!routerActive) {
    routerActive = true;
    // For initial page load or when routes are changed in the browser
    // URL textbox.
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
  }

  return (routes[path] = template);
}

const routes: RouteList = {};

// Get the route to render.
const resolveRoute = (route: string) => {
  try {
    return routes[route];
  } catch (error) {
    throw new Error('The route is not defined');
  }
};

let routerPrefix = '#';

export function setPrefix(prefix: string): void {
  routerPrefix = prefix;
}

function currentURL(): string {
  let url = window.location.hash.slice(1) || '/';
  if (routerPrefix === '') {
    url = window.location.pathname;
  }
  return url;
}

// Router will render the page based on the route to the DOM.
function router(): void {
  const url = currentURL();
  const routeResolved = resolveRoute(url);
  if (routeResolved) {
    render(routeResolved(), rootParent);
  } else {
    const error404 = resolveRoute('/404');
    if (error404) {
      render(error404(), rootParent);
      return;
    }

    render(createElement('404 Page not found'), rootParent);
  }
}
