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
      index: -1,
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
      index: -1,
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

  // TODO: I added this on currentRoot.
  if (currentRoot) {
    wipRoot = {
      type: currentRoot.type,
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
      index: -1,
    };
  }
  if (verbose) console.log('Redraw WipRoot:', wipRoot);
  setNextUnitOfWork(wipRoot);
  deletions = [];
}

export function commitRoot(deletes: Fiber[], wip: Fiber): void {
  if (verbose) console.log('CommitRoot:', wip);
  if (verbose) console.log('Deletions:', deletes);

  const stop = deletes.length > 0;

  // Process each deletion, but don't process siblings.
  deletes.forEach((fiber: Fiber) => {
    // FIXME: Checking for dom is not correct because it could be a function
    // and they don't have a DOM.
    if (fiber.dom) {
      commitWork(fiber, false);
    } else {
      //console.log('Found fragment on delete', fiber);
      commitWork(fiber, false);
    }
  });

  if (stop) {
    //throw new Error('stopped!');
  }

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
        if (domParent) {
          //console.log('PLACER:', domParent, typeof domParent, fiber);

          // if (
          //   fiber.index > -1 &&
          //   domParent.childNodes.length > 0 &&
          //   domParent.childNodes[fiber.index] //FIXME: This will be null and then it will do an appendChild anyway.
          // ) {
          //   //console.log('BAD!', domParent.childNodes[fiber.index]);
          //   domParent.insertBefore(
          //     fiber.dom,
          //     domParent.childNodes[fiber.index],
          //   );
          // } else {
          domParent.appendChild(fiber.dom);
          //}

          //domParent.insertBefore();
        } else {
          console.log('MISSING PARENT!');
        }
      } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
        if (fiber.alternate) {
          updateDom(fiber.dom, fiber.alternate.props, fiber.props);

          //fiber.dom.textContent = 'cool';
          //console.log('UPDATED:', fiber);
          // FIXME: This appendChild should not be here!!! Maybe the parent was removed earlier? The node should still be in the DOM.
          // if (domParent.childNodes.length > 1) {
          //domParent.appendChild(fiber.dom);
          // }
          if (
            domParent.lastChild &&
            !domParent.lastChild.isSameNode(fiber.dom)
          ) {
            // console.log(
            //   'Not last:',
            //   (domParent.lastChild as HTMLElement).outerHTML,
            //   (fiber.dom as HTMLElement).outerHTML,
            // );
            domParent.appendChild(fiber.dom);
          }
        } else {
          console.log('MISSING ALTERNATVE!');
        }
      } else if (fiber.effectTag === 'DELETION') {
        if (domParent) {
          commitDeletion(fiber, domParent, sibling);
        } else {
          console.log('MISSING DOMPARENT!');
        }
        return;
      } else {
        //console.log('NOTHING!', fiber);
      }
      commitWork(fiber.child, false);
      commitWork(fiber.sibling, false);
    }
  }

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
