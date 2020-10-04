"use strict"

perfMonitor.startFPSMonitor()
perfMonitor.startMemMonitor()
perfMonitor.initProfiler("render")

var data = []

console.log('Mantium:', mantium);

const m = mantium.m;

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
	requestAnimationFrame(update)
	
	data = ENV.generateData().toArray()

	perfMonitor.startProfile("render")
	m.redraw()
	perfMonitor.endProfile("render")
}

update()
