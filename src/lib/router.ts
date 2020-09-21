import { z } from '@/lib/z';

export interface RouteList {
  [property: string]: () => JSX.Element;
}

// Define a route.
export const route = (
  parent: HTMLElement,
  path: string,
  template: () => JSX.Element,
): (() => JSX.Element) => {
  z.state.rootParent = parent;

  // Register the router event listeners.
  if (!z.state.routerActive) {
    console.log('Router active.');
    z.state.routerActive = true;
    // For initial page load or when routes are changed in the browser
    // URL textbox.
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
  }

  return (z.state.routes[path] = template);
};

// Get the route to render.
const resolveRoute = (route: string) => {
  try {
    return z.state.routes[route];
  } catch (error) {
    throw new Error('The route is not defined');
  }
};

// Router will render the page based on the route to the DOM.
const router = (): void => {
  let url = window.location.hash.slice(1) || '/';
  if (z.state.routerPrefix === '') {
    url = window.location.pathname;
  }
  const routeResolved = resolveRoute(url);
  if (routeResolved) {
    z.render(z.state.rootParent, routeResolved);
  } else {
    const error404 = resolveRoute('/404');
    if (error404) {
      z.render(z.state.rootParent, error404);
      return;
    }

    console.log('Route not found');
    z.render(z.state.rootParent, '404 Page not found');
  }
};
