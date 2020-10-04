export const Mantium = {
  createElement,
  render,
};

interface Props {
  children?: JElem[];
  [elemName: string]: unknown;
}

interface JElem {
  type: string;
  props: Props;
}

function createElement(
  type: string,
  props = {} as Props,
  ...children: (JElem | string)[]
): JElem {
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

function createTextElement(text: string): JElem {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element: JElem, container: Node): void {
  if (element.type === 'TEXT_ELEMENT') {
    const dom = document.createTextNode('');
    if (element.props.nodeValue) {
      dom.nodeValue = element.props.nodeValue as string;
    }
    container.appendChild(dom);
  } else {
    const dom = document.createElement(element.type);

    const isProperty = (key: string) => key !== 'children';
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((name) => {
        dom.setAttribute(name, String(element.props[name]));
      });

    if (element.props.children) {
      element.props.children.forEach((child) => render(child, dom));
    }
    container.appendChild(dom);
  }
}
