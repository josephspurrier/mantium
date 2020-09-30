import { render } from './render';
import { state } from './state';

export interface RouteList {
  [property: string]: () => JSX.Element;
}

// Define a route.
export const route = (
  parent: HTMLElement,
  path: string,
  template: () => JSX.Element,
): (() => JSX.Element) => {
  state.rootParent = parent;

  // Register the router event listeners.
  if (!state.routerActive) {
    state.routerActive = true;
    // For initial page load or when routes are changed in the browser
    // URL textbox.
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
  }

  return (state.routes[path] = template);
};

// Get the route to render.
const resolveRoute = (route: string) => {
  try {
    return state.routes[route];
  } catch (error) {
    throw new Error('The route is not defined');
  }
};

export const currentURL = (): string => {
  let url = window.location.hash.slice(1) || '/';
  if (state.routerPrefix === '') {
    url = window.location.pathname;
  }
  return url;
};

// Router will render the page based on the route to the DOM.
const router = (): void => {
  const url = currentURL();
  const routeResolved = resolveRoute(url);
  if (routeResolved) {
    render(state.rootParent, routeResolved);
  } else {
    const error404 = resolveRoute('/404');
    if (error404) {
      render(state.rootParent, error404);
      return;
    }

    render(state.rootParent, '404 Page not found');
  }
};
