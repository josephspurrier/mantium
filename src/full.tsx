// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib/v2';
// import { RunTest1 } from './test1';
// import { RunTest2 } from './test2';
//import { TriangleDemo } from './page/triangle';
//import { m } from './lib/v2';
import { ErrorPage } from './page/error';
// import { HyperScript } from './page/hyperscript';
//import { JSONRequest } from './page/jsonrequest';
import { MainPage } from './page/main';
import { Page2 } from './page/page2';
import { UITestPage } from './page/uitest';
// import { Top } from './page/effect';
import { ContextRoot } from './page/context';
import { ContextRoot2 } from './page/context2';
import { Simple1, Simple2 } from './page/simple';
import { Stack1, Stack2 } from './page/stack';

//import { svelteRun } from './lib/v2/svelte';

//import './global.scss';

// // //const root = document.body;

export function Full(root: HTMLElement): void {
  // //m.state.routerPrefix = '#';
  m.route(root, '/', <MainPage />);
  m.route(root, '/app', <UITestPage />);
  m.route(root, '/page2', <Page2 />);
  // // // //m.route(root, '/effect', Top);
  m.route(root, '/context', <ContextRoot />);
  m.route(root, '/context2', <ContextRoot2 />);
  m.route(root, '/simple1', <Simple1 />);
  m.route(root, '/simple2', <Simple2 />);
  m.route(root, '/stack1', <Stack1 />);
  m.route(root, '/stack2', <Stack2 />);
  // // m.route(root, '/hyperscript', HyperScript);
  // // //m.route(root, '/jsonrequest', JSONRequest);
  m.route(root, '/404', <ErrorPage />);
}
// function Child() {
//   return (
//     <div>
//       <div>element 4</div>
//     </div>
//   );
// }

// function Element() {
//   return (
//     <div>
//       <span>element 3</span>
//       <Child />
//     </div>
//   );
// }

// m.rendered(() => {
//   m.rendered(() => {
//     console.log(root.outerHTML);
//   });
//   m.render(<Element />, root);
// });
// m.render(
//   <div>
//     <div>element 1</div>
//     <div>element 2</div>
//   </div>,
//   root,
// );

// setTimeout(() => {
//   m.render(<ContextRoot />, document.body);
// }, 500);

//svelteRun(root);

//m.render(root, TriangleDemo);

// m.config.setVerbose(true);

// RunTest1();
// //RunTest2();
