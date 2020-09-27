# Mantium

 ![Logo](static/logo.png)

This library demonstrates how to use JSX without React. It can be used as a learning tool to understand the internals of front-end frameworks using functional components/closures instead of classes. Many of the constructs included are very similiar/identical to [Mithril](https://mithril.js.org/) (routing, requests), [React](https://reactjs.org/) (`useState` and `useEffect`), and I'm sure other modern libraries.

## Installation

You can use either via a CDN or via a node module. Both JavaScript and TypeScript are supported. The types are included in the node module.

### CDN

```html
<script src="https://unpkg.com/mantium/dist/index.js"></script>
<script>
    const m = mantium.m;
    m.render(document.body, "hello world");
</script>
```

### NPM

If you need a webpack setup for TypeScript with ESLint that supports JSX, you can use this [template](https://github.com/josephspurrier/typescript-template).

```bash
npm install mantium -S
```

```typescript
import { m } from 'mantium';

m.render(document.body, 'hello world');
```

## Features

This library supports these features:

- [x] Render function for JSX
- [x] HyperScript support
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
- [x] Allow useState to pass in function to get previous value
- [x] Easy way to view output of generated code (`npm run build-clean`)
- [ ] Lifecycle methods
- [ ] Performance testing
- [x] Add Jest
- [x] Generate test coverage
- [ ] Unit tests
- [ ] Clean up the types
- [x] Launch on NPM to see how the process works
- [x] Publish on NPM in standalone JavaScript file format (Rollup)
- [x] Publish on NPM in CommonJS format (Rollup)

## Code Samples

Sample code is [here](https://github.com/josephspurrier/mantium/blob/main/src/index.tsx). npm package is [here](https://www.npmjs.com/package/mantium).

### Render Content

```javascript
const m = mantium.m;

m.render(document.body, 'hello world');
m.render(document.body, true);
```

### Routing

```typescript
import { m } from 'mantium';

m.state.routerPrefix = '#';
m.route(rootElem, '/', MainPage);
m.route(rootElem, '/app', UITestPage);
m.route(rootElem, '/404', ErrorPage);
```

### Components using JSX

```jsx
import { m } from 'mantium';

export const BooleanFlip = (): JSX.Element => {
  const [isBool, setBool] = m.useState(false);
  return (
    <>
      <button
        onclick={() => {
          setBool((prev) => !prev);
        }}
      >
        Change Boolean Value
      </button>
      <div>Current value: {isBool}</div>
    </>
  );
};

m.render(document.body, BooleanFlip);
```

### Components using HyperScript

```javascript
const m = mantium.m;
const h = mantium.m.createElement;

function MainPage() {
    return h('div', {}, 'hello world');
}

m.render(document.body, MainPage);
```

### Fragments

```jsx
import { m } from 'mantium';

export const FragLevel1 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 1.</div>
      <FragLevel2 />
    </>
  );
};

export const FragLevel2 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 2.</div>
    </>
  );
};

m.render(document.body, FragLevel1);
```

### Fragments without JSX

```jsx
const m = mantium.m;
const h = mantium.m.createElement;

function FragLevel1() {
  return h('FRAGMENT', {},
    h('div', {}, 'Fragment level 1.'),
    h(FragLevel2));
}

function FragLevel2() {
  return h('FRAGMENT', {},
    h('div', {}, 'Fragment level 2.'));
}

m.render(document.body, FragLevel1);
```

### Passing Attributes and Children

```jsx
import { m } from 'mantium';

export const App = (): JSX.Element => {
  return (
    <div class='app'>
      <FragmentChild num1='10A' num2='10B'>
        <div>Text should be in a div.</div>
      </FragmentChild>
    </div>
  );
};

interface FragmentsAttrs {
  num1: string;
  num2: string;
  children: JSX.Element | string;
}

const FragmentChild = (attrs: FragmentsAttrs): JSX.Element => {
  return (
    <>
      <div name={attrs.num1}>div {attrs.num1}</div>
      {attrs.children}
      <div name={attrs.num2}>div {attrs.num2}</div>
    </>
  );
};

const rootElem = document.createElement('div');
rootElem.setAttribute('id', 'root');
document.body.appendChild(rootElem);
m.render(rootElem, App);
```

### Redrawing and Event Handlers

```jsx
import { m } from 'mantium';

export const RedrawButtons = (): JSX.Element => {
  const [count, setCount] = m.useState(0);
  return (
    <>
      <button
        onclick={() => {
          setTimeout(() => {
            setCount((prev) => prev + 1);
          }, 1000);
        }}
      >
        1 Second Timer with setState [auto redraw] ({count} clicks)
      </button>

      <button
        onclick={() => {
          m.redraw();
        }}
      >
        Manual Redraw
      </button>

      <button
        onclick={() => {
          setTimeout(() => {
            globalCounter++;
          }, 1000);
        }}
      >
        1 Second Timer on Global Variable [requires manual redraw] (
        {globalCounter} clicks)
      </button>
    </>
  );
};

m.render(document.body, RedrawButtons);
```

### Requests


```jsx
import { m } from 'mantium';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

let alreadyRan = false;

const useEffect = (f: () => void, when: string[] = []) => {
  if (when.length === 0) {
    if (!alreadyRan) {
      alreadyRan = true;
      f();
    }
  }
};

export const JSONRequest = (): JSX.Element => {
  const [getPost, setPost] = m.useState({} as PostResponse);
  const [getUser, setUser] = m.useState({} as UserResponse);

  useEffect(() => {
    m.request<PostResponse>({
      url: 'https://jsonplaceholder.typicode.com/posts/5',
    })
      .then((data: PostResponse) => {
        setPost(data);

        return m.request<UserResponse>({
          url: `https://jsonplaceholder.typicode.com/users/${data.userId}`,
        });
      })
      .then((udata: UserResponse) => {
        setUser(udata);
      })
      .catch((error: Response) => {
        console.warn(error);
      });
  });

  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <h1>Title: {getPost.title}</h1>
      <h2>By: {getUser.name}</h2>
      <i>Post ID: {getPost.id}</i>
      <p>{getPost.body}</p>
    </>
  );
};

m.render(document.body, JSONRequest);
```

### Meiosis Pattern for State Management

You can read about it [here](https://meiosis.js.org/).

```jsx
import { m } from 'mantium';

interface StateAttrs {
  count: number;
  sqr: number;
}

const State = (): StateAttrs => ({
  count: 0,
  sqr: 0,
});

const Actions = (
  S: StateAttrs,
  A = {
    sqr: () => (S.sqr = S.count ** 2),
    inc: () => {
      S.count++;
      A.sqr();
    },
    dec: () => {
      S.count--;
      A.sqr();
    },
  },
) => A;

export const Meiosis = (): JSX.Element => {
  const [state] = m.useState(State());
  const [actions] = m.useState(Actions(state));

  return (
    <>
      <button
        onclick={() => {
          actions.inc();
        }}
      >
        Add
      </button>
      <button
        onclick={() => {
          actions.dec();
        }}
      >
        Subtract
      </button>
      <div>
        Current value: {state.count} | Squared: {state.sqr}
      </div>
    </>
  );
};

m.render(document.body, Meiosis);
```
