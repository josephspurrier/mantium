// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib';
// import { ErrorPage } from './page/error';
// import { HyperScript } from './page/hyperscript';
// import { JSONRequest } from './page/jsonrequest';
// import { MainPage } from './page/main';
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// perfMonitor.startFPSMonitor()
// perfMonitor.startMemMonitor()
// perfMonitor.initProfiler("render")

const data = [];

m.render(root, function () {
  return m.createElement('div', [
    m.createElement('table', { className: 'table table-striped latest-data' }, [
      m.createElement(
        'tbody',
        data.map(function (db) {
          return m.createElement('tr', { key: db.dbname }, [
            m.createElement('td', { className: 'dbname' }, db.dbname),
            m.createElement('td', { className: 'query-count' }, [
              m.createElement(
                'span',
                { className: db.lastSample.countClassName },
                db.lastSample.nbQueries,
              ),
            ]),
            db.lastSample.topFiveQueries.map(function (query) {
              return m.createElement(
                'td',
                { className: query.elapsedClassName },
                [
                  query.formatElapsed,
                  m.createElement('div', { className: 'popover left' }, [
                    m.createElement(
                      'div',
                      { className: 'popover-content' },
                      query.query,
                    ),
                    m.createElement('div', { className: 'arrow' }),
                  ]),
                ],
              );
            }),
          ]);
        }),
      ),
    ]),
  ]);
});

function update() {
  requestAnimationFrame(update);

  //data = ENV.generateData().toArray();

  //perfMonitor.startProfile('render');
  m.redraw();
  //perfMonitor.endProfile('render');
}

update();
