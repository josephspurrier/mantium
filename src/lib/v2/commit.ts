import { verbose } from '.';
import { updateDom } from './attrs';
import { createElement } from './mnode';
import { setNextUnitOfWork, setWorkDone } from './scheduler';
import { Fiber, MNode, NodeType } from './type';

export let currentRoot: Fiber | undefined;
export let wipRoot: Fiber | undefined;
export let deletions = [] as Fiber[];
export let rootParent: HTMLElement;

export function render(
  rawElement: MNode | string | number | boolean,
  container: HTMLElement,
): void {
  setWorkDone(false);
  //console.log('Render:', rawElement, container);

  let elementType: NodeType;

  let element: MNode;
  if ((rawElement as MNode).props || (rawElement as MNode).tag) {
    element = rawElement as MNode;
    elementType = NodeType.ELEMENT;
  } else {
    // Create a fragment.
    element = createElement('', {}, String(rawElement));
    elementType = NodeType.FRAGMENT;
  }

  if (currentRoot) {
    // Redraw.
    wipRoot = {
      type: elementType,
      dom: currentRoot.dom,
      props: {
        children: [element],
      },
      alternate: currentRoot,
      //index: -1,
    };
    deletions = [];
    setNextUnitOfWork(wipRoot);
  } else {
    // First draw.
    rootParent = container;
    wipRoot = {
      type: elementType,
      dom: container,
      props: {
        children: [element],
      },
      alternate: currentRoot,
      //index: -1,
    };
    deletions = [];
    setNextUnitOfWork(wipRoot);
  }
}

export function setRootParent(element: HTMLElement): void {
  rootParent = element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function redraw(origin = ''): void {
  //console.log('redraw:', origin);

  if (currentRoot) {
    wipRoot = {
      type: currentRoot.type,
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
      //index: -1,
    };
  }
  if (verbose) console.log('Redraw WipRoot:', wipRoot);
  setNextUnitOfWork(wipRoot);
  deletions = [];
}

export function commitRoot(deletes: Fiber[], wip: Fiber): void {
  if (verbose) console.log('CommitRoot:', wip);
  if (verbose) console.log('Deletions:', deletes);

  // Process each deletion, but don't process siblings.
  deletes.forEach((fiber: Fiber) => {
    commitWork(fiber);
  });

  if (wip) {
    commitWork(wip.child, false);
  }
  currentRoot = wip;
  wipRoot = undefined;
}

function commitWork(fiber: Fiber | undefined, sibling = false) {
  if (!fiber || !fiber.parent) {
    return;
  }

  // For the fiber that was passed (and it could be a deletion), get the parent
  // and if the parent doesn't have a dom, then get the grandparent, and
  // continue upwards until a dom is found.
  let domParentFiber: Fiber | undefined = fiber.parent;
  while (domParentFiber && !domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  // Once a parent is found with a dom, check the fiber tag to see what
  // operation needs to be handled on it.
  const domParent = domParentFiber && domParentFiber.dom;
  if (!domParent) {
    return;
  }

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
    if (!fiber.alternate) {
      console.log('MISSING ALTERNATVE!');
      return;
    }

    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    // This doesn't work because there are a lot of arrays where there are
    // elements at the end that are updated so they just keep getting appended.
    // if (domParent.lastChild && !domParent.lastChild.isSameNode(fiber.dom)) {
    //   // console.log(
    //   //   'Not last:',
    //   //   (domParent.lastChild as HTMLElement).outerHTML,
    //   //   (fiber.dom as HTMLElement).outerHTML,
    //   // );
    // }

    // This article suggests doing a replace:
    // https://medium.com/@KevinBGreene/adventures-in-the-virtual-dom-part-2-the-diff-render-loop-dac7f879bb21

    // FIXME: This will redraw everything, but when you remove it, elements
    // get out of order because the PLACEMENT above will add a child to the end
    // while and UPDATE will not change the location of the element.
    //domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent, sibling);
    return;
  } else {
    //console.log('NOTHING!', fiber);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);

  return;
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
