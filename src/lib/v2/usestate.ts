import { redraw } from './commit';
import { wipFiber } from './reconciler';
import { Hook } from './type';

let hookIndex = 0;

export function resetHookIndex(): void {
  hookIndex = 0;
}

export function useState<T>(
  initial: T,
): [T, (action: (prevVal: T) => T) => void] {
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
