// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib';
import { ErrorPage } from './page/error';
import { JSONRequest } from './page/jsonrequest';
import { MainPage } from './page/main';
import { Page2 } from './page/page2';
import { UITestPage } from './page/uitest';

const rootElem = document.createElement('div');
rootElem.setAttribute('id', 'root');
document.body.appendChild(rootElem);
//z.render(rootElem, UITestPage);

m.state.routerPrefix = '#';
m.route(rootElem, '/', MainPage);
m.route(rootElem, '/app', UITestPage);
m.route(rootElem, '/page2', Page2);
m.route(rootElem, '/jsonrequest', JSONRequest);
m.route(rootElem, '/404', ErrorPage);
