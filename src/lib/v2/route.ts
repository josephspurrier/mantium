import { render, rootParent, setRootParent } from './commit';
import { createElement } from './mnode';

export interface RouteList {
  [property: string]: JSX.Element;
}

let routerActive = false;

// Define a route.
export function route(
  parent: HTMLElement,
  path: string,
  template: JSX.Element,
): JSX.Element {
  //rootParent = parent;
  setRootParent(parent);

  // Register the router event listeners.
  if (!routerActive) {
    routerActive = true;
    // For initial page load or when routes are changed in the browser
    // URL textbox.
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
  }

  return (routes[path] = template);
}

const routes: RouteList = {};

// Get the route to render.
const resolveRoute = (route: string) => {
  try {
    return routes[route];
  } catch (error) {
    throw new Error('The route is not defined');
  }
};

let routerPrefix = '#';

export function setPrefix(prefix: string): void {
  routerPrefix = prefix;
}

function currentURL(): string {
  let url = window.location.hash.slice(1) || '/';
  if (routerPrefix === '') {
    url = window.location.pathname;
  }
  return url;
}

// Router will render the page based on the route to the DOM.
function router(): void {
  //console.log('router called!');
  const url = currentURL();
  const routeResolved = resolveRoute(url);
  if (routeResolved) {
    render(routeResolved, rootParent);
  } else {
    const error404 = resolveRoute('/404');
    if (error404) {
      render(error404, rootParent);
      return;
    }

    render(createElement('404 Page not found'), rootParent);
  }
}
