// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from '@/lib/z';
import { ErrorPage } from '@/page/error';
import { JSONRequest } from '@/page/jsonrequest';
import { MainPage } from '@/page/main';
import { Page2 } from '@/page/page2';
import { UITestPage } from '@/page/uitest';

const rootElem = document.createElement('div');
rootElem.setAttribute('id', 'root');
document.body.appendChild(rootElem);
//z.render(rootElem, UITestPage);

z.state.routerPrefix = '#';
z.route(rootElem, '/', MainPage);
z.route(rootElem, '/app', UITestPage);
z.route(rootElem, '/page2', Page2);
z.route(rootElem, '/jsonrequest', JSONRequest);
z.route(rootElem, '/404', ErrorPage);
