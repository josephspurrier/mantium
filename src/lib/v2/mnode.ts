import { updateDom } from './attrs';
import { Fiber, MNode, NodeType, Props } from './type';

export function createElement(
  body: string | NodeType,
  props = {} as Props,
  ...children: (MNode | string)[]
): MNode {
  const getChildren = (arr: (MNode | unknown)[]): MNode[] => {
    let r: MNode[] = [];

    arr.forEach((element: unknown) => {
      if (Array.isArray(element)) {
        r = [...r, ...getChildren(element)];
      } else {
        if (element && (element as MNode).tag) {
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

  if (body) {
    return {
      type: NodeType.ELEMENT,
      tag: body as string,
      props: {
        ...props,
        children: getChildren(children),
      },
    };
  }
  return {
    type: NodeType.FRAGMENT,
    tag: 'UNUSED',
    props: {
      ...props,
      children: getChildren(children),
    },
  };
}

export function createFragment(props: Props): MNode {
  return {
    type: NodeType.FRAGMENT,
    tag: 'UNUSED',
    props: {
      children: props.children,
    },
  };
}

function createTextElement(text: string): MNode {
  return {
    type: NodeType.TEXT,
    tag: 'UNUSED',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export function createDom(fiber: Fiber): HTMLElement | DocumentFragment | Text {
  //TODO: I added this "as string".
  let dom: HTMLElement | Text | DocumentFragment;
  switch (fiber.type) {
    case NodeType.TEXT: {
      dom = document.createTextNode('');
      break;
    }
    // case undefined: {
    //   console.log('YOU SHOULD NEVER SEE THIS.', fiber);
    //   //dom = document.createDocumentFragment();
    //   //dom = document.createElement(fiber.body as string);
    //   break;
    // }
    default: {
      dom = document.createElement(fiber.body as string);
      break;
    }
  }

  updateDom(dom, {}, fiber.props);

  return dom;
}
