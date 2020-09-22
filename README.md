# Mantium

**This is a WIP while testing how JSX works without React. Don't use this in production - it's designed as a learning tool to understand the internals of front-end frameworks.**

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

# Code Samples

Sample code is [here](https://github.com/josephspurrier/mantium/blob/main/src/index.tsx). npm package is [here](https://www.npmjs.com/package/mantium).

## Routing

```typescript
import { m } from 'mantium';

m.state.routerPrefix = '#';
m.route(rootElem, '/', MainPage);
m.route(rootElem, '/app', UITestPage);
m.route(rootElem, '/404', ErrorPage);
```

## JSX Components

```jsx
import { m } from 'mantium';

export const BooleanFlip = (): JSX.Element => {
  const [isBool, setBool] = m.useState(false);
  return (
    <>
      <button
        onclick={() => {
          setBool(!isBool());
        }}
      >
        Change Boolean Value
      </button>
      <div>Current value: {isBool()}</div>
    </>
  );
};
```

## Fragments

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
      <FragLevel3 />
    </>
  );
};
```

## Passing Attributes and Children

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

## Redrawing and Event Handlers

```jsx
import { m } from 'mantium';

export const RedrawButtons = (): JSX.Element => {
  const [count, setCount] = m.useState(0);
  const [count2, setCount2] = m.useState(0);
  return (
    <>
      <button
        onclick={() => {
          setTimeout(() => {
            setCount(count() + 1);
          }, 1000);
        }}
      >
        1 Second Timer without Redraw ({count()} clicks)
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
            setCount2(count2() + 1);
            m.redraw();
          }, 1000);
        }}
      >
        1 Second Timer with Redraw ({count2()} clicks)
      </button>
    </>
  );
};
```

## Requests


```jsx
import { m } from 'mantium';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserReponse {
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
  const [getUser, setUser] = m.useState({} as UserReponse);

  useEffect(() => {
    m.request<PostResponse>({
      url: 'https://jsonplaceholder.typicode.com/posts/5',
    })
      .then((data) => {
        setPost(data);

        return m
          .request<UserReponse>({
            url: `https://jsonplaceholder.typicode.com/users/${data.userId}`,
          })
          .then((udata) => {
            setUser(udata);
          })
          .catch((error: Response) => {
            console.warn(error);
          });
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
      <h1>Title: {getPost().title}</h1>
      <h2>By: {getUser().name}</h2>
      <i>Post ID: {getPost().id}</i>
      <p>{getPost().body}</p>
    </>
  );
};
```