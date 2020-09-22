# Mantium

**This is a WIP while testing how JSX works without React. Don't use this in production - it's designed as a learning tool to understand the internals of front-end frameworks.**

It does support JSX via .jsx or .tsx file extensions. This project is designed to show how modern, front-end development tools integrate. It takes a while to piece together your own tools for linting, building, testing, etc. so you can reference this to see how to get all these different tools set up and integrated.

This project supports these features:

- [x] Render function for JSX
- [x] JSX using TypeScript (.tsx)
- [ ] JSX using Babel (.jsx)
- [x] JSX fragments
- [x] JSX declarations/interfaces for: IntrinsicElements, Element, ElementChildrenAttribute
- [x] JSX children access via attributes (typing available using interfaces)
- [x] JSX attribute access (using interfaces)
- [x] JSX functional components
- [ ] JSX class components
- [x] JSX as children in JSX components
- [ ] JSX keys for loops
- [x] JSX attributes for strings
- [ ] JSX attributes for booleans (like 'required') - this needs testing
- [ ] Sort out class vs className
- [ ] Test forceUpdate for event handlers
- [x] JSX event handling for 'on' functions
- [x] Virtual DOM
- [x] Reactivity
- [x] Redrawing on click events
- [x] Local variable state using 'useState'
- [x] Router
- [x] 404 page
- [x] Hash URL prefix handling
- [x] Router and virtual DOM handling
- [x] Virtual DOM handling of fragments at top level
- [ ] Add Link to handle changing pages for URLs that don't include the hash
- [ ] Support history handling on page URLs
- [ ] Support regex on routes for authentication
- [x] Request Handling for JSON
- [ ] Request handling for non-JSON
- [ ] Handle redraws on requests to ensure loop don't occur
- [ ] Add useEffect to handle when to update (onLoad, on variable change, etc)
- [x] Add redraw after request (doesn't alway work, especially with nested requested, but if useing useState then it will)
- [x] Add redraw on setter from useState
- [x] Easy way to view output of generated code (`npm run build-clean`)
- [ ] Lifecycle methods
- [ ] Performance testing
- [ ] Unit tests
- [ ] Clean up the types
- [x] Launch on NPM to see how the process works