// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib';
import { ErrorPage } from './page/error';
import { HyperScript } from './page/hyperscript';
import { JSONRequest } from './page/jsonrequest';
import { MainPage } from './page/main';
import { Page2 } from './page/page2';
import { UITestPage } from './page/uitest';
import { Top } from './page/effect';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

m.state.routerPrefix = '#';
m.route(root, '/', MainPage);
m.route(root, '/app', UITestPage);
m.route(root, '/page2', Page2);
m.route(root, '/effect', Top);
m.route(root, '/hyperscript', HyperScript);
m.route(root, '/jsonrequest', JSONRequest);
m.route(root, '/404', ErrorPage);
