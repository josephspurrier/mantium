// let nextUnitOfWork = null;
// function workLoop(deadline) {
//   let shouldYield = false;
//   while (nextUnitOfWork && !shouldYield) {
//     nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
//     shouldYield = deadline.timeRemaining() < 1;
//   }
//   requestIdleCallback(workLoop);
// }

// requestIdleCallback(workLoop);

// function performUnitOfWork(nextUnitOfWork) {
//   // TODO
// }

const ENOUGH_TIME = 1; // milliseconds

const workQueue = [] as Fiber[];
let nextUnitOfWork: undefined | Fiber = undefined;

// function schedule(task: Fiber) {
//   workQueue.push(task);
//   requestIdleCallback(performWork);
// }

function scheduleUpdate(instance, partialState) {
  updateQueue.push({
    from: CLASS_COMPONENT,
    instance: instance,
    partialState: partialState,
  });
  requestIdleCallback(performWork);
}

const performWork: IdleRequestCallback = (deadline) => {
  if (!nextUnitOfWork) {
    nextUnitOfWork = workQueue.shift();
  }

  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork || workQueue.length > 0) {
    requestIdleCallback(performWork);
  }
};

if ('requestIdleCallback' in window) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //requestIdleCallback();
  // Use requestIdleCallback to schedule work.
} else {
  // Do what you’d do today.
}

const performUnitOfWork = (work: Fiber): Fiber => {
  return work;
  //   beginWork(wipFiber);
  //   if (wipFiber.child) {
  //     return wipFiber.child;
  //   }
  //   // No child, we call completeWork until we find a sibling
  //   let uow = wipFiber;
  //   while (uow) {
  //     completeWork(uow);
  //     if (uow.sibling) {
  //       // Sibling needs to beginWork
  //       return uow.sibling;
  //     }
  //     uow = uow.parent;
  //   }
};

interface Fiber {
  tag: string;
  type: string;
}

export const fiber = {
  tag: 'HOST_COMPONENT',
  type: 'div',
  //parent: parentFiber,
  //child: childFiber,
  sibling: null,
  //alternate: currentFiber,
  stateNode: document.createElement('div'),
  props: { children: [], className: 'foo' },
  partialState: null,
  //effectTag: PLACEMENT,
  effects: [],
};
