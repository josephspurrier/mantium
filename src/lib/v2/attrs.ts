import { Props } from './type';

const isEvent = (key: string) => key.startsWith('on');
const isProperty = (key: string) => key !== 'children' && !isEvent(key);
const isNew = (prev: Props, next: Props) => (key: string) => {
  return prev[key] !== next[key];
};
const isGone = (prev: Props, next: Props) => (key: string) => !(key in next);

export function updateDom(
  dom: HTMLElement | DocumentFragment | Text,
  prevProps: Props,
  nextProps: Props,
): void {
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
        dom.removeAttribute(name);
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
