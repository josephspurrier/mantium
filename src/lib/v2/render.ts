import { MNode, NodeType } from './type';

export function renderNow(element: MNode, container: HTMLElement): void {
  if (element.type === NodeType.TEXT) {
    const dom = document.createTextNode('');
    if (element.props.nodeValue) {
      dom.nodeValue = element.props.nodeValue as string;
    }
    container.appendChild(dom);
  } else if (element.type === NodeType.FRAGMENT) {
    if (element.props.children) {
      element.props.children.forEach((child) => renderNow(child, container));
    }
  } else if (element.tag instanceof Function) {
    const mnode = element.tag(element.props);
    renderNow(mnode, container);
  } else {
    const dom = document.createElement(String(element.tag));

    const isProperty = (key: string) => key !== 'children';
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((name) => {
        dom.setAttribute(name, String(element.props[name]));
      });

    if (element.props.children) {
      element.props.children.forEach((child) => renderNow(child, dom));
    }
    container.appendChild(dom);
  }
}
