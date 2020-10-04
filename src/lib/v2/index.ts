export const m = {
  createElement,
  createFragment,
  render,
  renderNow,
  useState,
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

interface Fiber {
  type?: string | ((props: Props) => MNode);
  dom?: HTMLElement | DocumentFragment | Text;
  props: Props;
  alternate?: Fiber;
  parent?: Fiber;
  sibling?: Fiber;
  child?: Fiber;
  hooks?: Hook<unknown>[];
  effectTag?: string;
}

interface Hook<T> {
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
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
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
    // case 'FRAGMENT': {
    //   console.log('YOU SHOULD NEVER SEE THIS.');
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
const isNew = (prev: Props, next: Props) => (key: string) =>
  prev[key] !== next[key];
const isGone = (prev: Props, next: Props) => (key: string) => !(key in next);

function updateDom(
  dom: HTMLElement | DocumentFragment | Text,
  prevProps: Props,
  nextProps: Props,
) {
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
        dom.setAttribute(name, '');
      });

    // Set new or changed properties
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        //dom[name] = nextProps[name];
        dom.setAttribute(name, String(nextProps[name]));
      });
  } else if (dom instanceof Text) {
    // Else just set the node value.
    dom.nodeValue = nextProps.nodeValue as string;
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

function commitRoot() {
  deletions.forEach(commitWork);
  // TODO: I added this because wipRoot could be null?
  if (wipRoot) {
    commitWork(wipRoot.child);
  }
  currentRoot = wipRoot;
  wipRoot = undefined;
}

function commitWork(fiber: Fiber | undefined) {
  if (!fiber) {
    return;
  }

  let domParentFiber = fiber.parent;
  // TODO: I added the check for domParentFiber because it could be null.
  if (domParentFiber) {
    while (domParentFiber && !domParentFiber.dom) {
      domParentFiber = domParentFiber.parent;
    }

    // TODO: Typescript required this because it wouldn't take the top value;
    if (domParentFiber) {
      const domParent = domParentFiber.dom;
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
      } else if (fiber.effectTag === 'DELETION') {
        // TODO: I added this check.
        if (domParent) {
          commitDeletion(fiber, domParent);
        } else {
          console.log('MISSING DOMPARENT!');
        }
      }
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(
  fiber: Fiber,
  domParent: HTMLElement | DocumentFragment | Text,
) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    // TODO: I added this check.
    if (fiber.child) {
      commitDeletion(fiber.child, domParent);
    }
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
    console.log('found fragment');
    if (element.props.children) {
      element.props.children.forEach((child) => renderNow(child, container));
    }
  } else if (element.type instanceof Function) {
    const mnode = element.type(element.props);
    renderNow(mnode, container);
  } else {
    console.log('name:', element.type);
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

function render(element: MNode, container: HTMLElement): void {
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

function workLoop(deadline: IdleDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    //console.log('found unit of work:', nextUnitOfWork);
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // FIXME: Delete
  if (wipRoot) {
    console.log('wipRoot:', wipRoot);
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: Fiber): Fiber | undefined {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
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

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber: Fiber | undefined;

    // Handle fragments.
    if (element.type === 'FRAGMENT') {
      if (element.props.children) {
        const [firstSib, lastSibling] = reconcileChildren(
          curFiber,
          element.props.children,
        );
        if (index === 0) {
          curFiber.child = firstSib;
        }
        prevSibling = lastSibling;
      }
    } else {
      const sameType = oldFiber && element && element.type == oldFiber.type;

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

function useState<T>(initial: T): [T, (action: (prevVal: T) => T) => void] {
  const oldHook =
    wipFiber &&
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook: Hook<T> = {
    state: oldHook ? (oldHook.state as T) : initial,
    queue: [] as ((prev: T) => T)[],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state) as T;
  });

  // TODO: This only looks like it supports a function, but we'll work with it for now.
  const setState = function (action: (prev: T) => T): void {
    hook.queue.push(action);
    // TODO: I added this on currentRoot.
    if (currentRoot) {
      wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot,
      };
    }
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  // TODO: I added this, may need to see if the index should be in or out.
  if (wipFiber) {
    // TODO: I added this too.
    if (!wipFiber.hooks) {
      wipFiber.hooks = [] as Hook<unknown>[];
    }
    // TODO: This looks weird.
    wipFiber.hooks.push(hook as Hook<unknown>);
    hookIndex++;
  }
  return [hook.state, setState];
}
