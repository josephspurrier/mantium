export interface Props {
  children?: MNode[];
  [elemName: string]: unknown;
}

export interface MNode {
  type: NodeType;
  tag: string | ((props: Props) => MNode);
  props: Props;
}

export enum NodeType {
  ELEMENT, // Is a div, p, a, etc.
  TEXT, // Is a text element.
  FUNCTION, // Is a callable function.
  FRAGMENT, // Is a fragment.
}

export interface Fiber {
  type: NodeType;
  body?: string | ((props: Props) => MNode);
  dom?: HTMLElement | DocumentFragment | Text;
  props: Props;
  // We also add the alternate property to every fiber. This property is a
  // link to the old fiber, the fiber that we committed to the DOM in the previous commit phase.
  alternate?: Fiber;
  //index: number;
  parent?: Fiber;
  sibling?: Fiber;
  child?: Fiber;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hooks?: Hook<any>[];
  effectTag?: string;
}

export interface Hook<T> {
  initial: T;
  state: T;
  queue: ((value: T) => T)[];
}

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
