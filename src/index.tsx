// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib';
import { Mantium } from './lib/v2/createElement';
// import { ErrorPage } from './page/error';
// import { HyperScript } from './page/hyperscript';
// import { JSONRequest } from './page/jsonrequest';
import { MainPage } from './page/main';
// import { Page2 } from './page/page2';
// import { UITestPage } from './page/uitest';
// import { Top } from './page/effect';
// import { ContextRoot } from './page/context';
// import { ContextRoot2 } from './page/context2';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

// m.state.routerPrefix = '#';
// m.route(root, '/', MainPage);
// m.route(root, '/app', UITestPage);
// m.route(root, '/page2', Page2);
// m.route(root, '/effect', Top);
// m.route(root, '/context', ContextRoot);
// m.route(root, '/context2', ContextRoot2);
// m.route(root, '/hyperscript', HyperScript);
// m.route(root, '/jsonrequest', JSONRequest);
// m.route(root, '/404', ErrorPage);

// const element = <h1 title='foo'>Hello</h1>;
// m.render(root, element);

// const element = {
//   type: 'h1',
//   props: {
//     title: 'foo',
//     children: 'Hello',
//   },
// };

// const element = Mantium.createElement(
//   'div',
//   { id: 'foo' },
//   Mantium.createElement('a', {}, 'bar'),
//   Mantium.createElement('b'),
// );

/** @jsx Mantium.createElement */
// const element = (
//   <div id='foo'>
//     <a>bar</a>
//     <b />
//   </div>
// );

/** @jsx Mantium.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Counter() {
  const [state, setState] = Mantium.useState(1);
  return <h1 onClick={() => setState((prev) => prev + 1)}>Count: {state}</h1>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Hello() {
  return <div>Hello</div>;
}

const element = <MainPage />;
//element = <Hello />;

//console.log('Element:', element);
Mantium.render(element, root);
console.log('Render should be done.');

// const node = document.createElement(element.type);
// node['title'] = element.props.title as string;
// const text = document.createTextNode('');
// text.nodeValue = element.props.children;
// node.appendChild(text);
// root.appendChild(node);
