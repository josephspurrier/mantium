// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib/v2';
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

//import { svelteRun } from './lib/v2/svelte';

//import './global.scss';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

// // //m.state.routerPrefix = '#';
m.route(root, '/', MainPage);
m.route(root, '/app', UITestPage);
m.route(root, '/page2', Page2);
// // // //m.route(root, '/effect', Top);
m.route(root, '/context', ContextRoot);
m.route(root, '/context2', ContextRoot2);
m.route(root, '/simple1', Simple1);
m.route(root, '/simple2', Simple2);
// // m.route(root, '/hyperscript', HyperScript);
// // //m.route(root, '/jsonrequest', JSONRequest);
m.route(root, '/404', ErrorPage);

// m.render(MainPage(), root);

// setTimeout(() => {
//   m.render(ContextRoot(), root);
// }, 500);

// // m.rendered(() => {
// //   m.render(<ContextRoot />, root);
// // });

//svelteRun(root);

//m.render(root, TriangleDemo);
