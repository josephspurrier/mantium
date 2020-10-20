import { commitRoot, deletions, wipRoot } from './commit';
import { updateFunctionComponent, updateHostComponent } from './reconciler';
import { Fiber } from './type';

let workDone = false;
export function setWorkDone(v: boolean): void {
  workDone = v;
}

let nextUnitOfWork: Fiber | undefined;

export function setNextUnitOfWork(value: Fiber | undefined): void {
  nextUnitOfWork = value;
}

// If false, then will stop the requestIdleCallback loop.
export let runWork = true;

export function setWorkMode(value: boolean): void {
  runWork = value;
}

// Function that commits the work to the dom.
let commitWorkFunc = commitRoot;

export function setCommitWorkFunc(
  value: (deletes: Fiber[], wip: Fiber) => void,
): void {
  commitWorkFunc = value;
}

export function resetCommitWorkFunc(): void {
  commitWorkFunc = commitRoot;
}

let renderedCallback: () => void;

export function rendered(callback: () => void): void {
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
      if (renderedCallback) {
        const rc = renderedCallback.bind({});
        // Reset it so it doesn't loop.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        renderedCallback = () => {};
        // Call the callback.
        rc();
      }
    }
  }

  if (runWork) requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: Fiber): Fiber | undefined {
  //console.log('performWork:', fiber);
  const isFunctionComponent = fiber.body instanceof Function;
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

requestIdleCallback(workLoop);
