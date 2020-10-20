import { verbose } from '.';
import { deletions } from './commit';
import { createDom } from './mnode';
import { Fiber, MNode, NodeType, Props } from './type';
import { resetHookIndex } from './usestate';

export let wipFiber: Fiber | undefined;

export function updateFunctionComponent(fiber: Fiber): void {
  const fun = fiber.body as (props: Props) => MNode;
  wipFiber = fiber;
  resetHookIndex();
  wipFiber.hooks = [];
  const children = [fun(fiber.props)] as MNode[];
  reconcileChildren(fiber, children);
}

export function updateHostComponent(fiber: Fiber): void {
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

  while (index < elements.length || oldFiber !== undefined) {
    const element = elements[index];
    let newFiber: Fiber | undefined;

    // Handle fragments.
    //console.log('element:', curFiber, elements, elements.length, index);
    if (element && element.type === NodeType.FRAGMENT) {
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
      const sameType =
        oldFiber && element && String(element.tag) == String(oldFiber.body);

      // If the fiber already exists, then just update it.
      if (element && !sameType) {
        if (!oldFiber) {
          // If the fiber doesn't exist yet, set it to create.
          newFiber = {
            type: element.type,
            body: element.tag,
            props: element.props,
            dom: undefined,
            parent: curFiber,
            alternate: undefined,
            //index: index,
            effectTag: 'PLACEMENT',
          };
        } else {
          // If the fiber does exist, do a replace.
          newFiber = {
            type: element.type,
            body: element.tag,
            props: element.props,
            dom: undefined,
            parent: curFiber,
            alternate: oldFiber,
            //index: index,
            effectTag: 'REPLACE',
          };
        }

        // }
        // if (curFiber.index > -1 && typeof curFiber.body !== 'string') {
        //   //console.log('Parent Index:', curFiber.index);
        //   newFiber.index = curFiber.index + index;
        // }

        //console.log('Fiber PLACEMENT:', oldFiber, newFiber);
      } else if (oldFiber && sameType) {
        newFiber = {
          type: element.type,
          body: oldFiber.body,
          props: element.props,
          dom: oldFiber.dom,
          parent: curFiber,
          alternate: oldFiber,
          //index: index, //FIXME: I don't know if this is index or -1?
          effectTag: 'UPDATE',
        };

        // if (curFiber.index > -1 && typeof curFiber.body !== 'string') {
        //   //console.log('Parent Index:', curFiber.index);
        //   newFiber.index = curFiber.index + index;
        // }

        //console.log('Fiber UPDATE:', oldFiber, newFiber);
      }

      if (oldFiber && !sameType && !element) {
        // If the fiber already exists and is a different type, delete it.
        //console.log('Fiber DELETION:', oldFiber, newFiber);
        //console.log('DELETION OLD:', oldFiber.body);
        //console.log('DELETION NEW:', element.body);
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
