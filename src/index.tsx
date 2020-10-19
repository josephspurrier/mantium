// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib/v2';
// //import { TriangleDemo } from './page/triangle';
// //import { m } from './lib/v2';
// import { ErrorPage } from './page/error';
// // import { HyperScript } from './page/hyperscript';
// //import { JSONRequest } from './page/jsonrequest';
// import { MainPage } from './page/main';
// import { Page2 } from './page/page2';
// import { UITestPage } from './page/uitest';
// // import { Top } from './page/effect';
// import { ContextRoot } from './page/context';
// import { ContextRoot2 } from './page/context2';
// import { Simple1, Simple2 } from './page/simple';
// import { Stack1, Stack2 } from './page/stack';
// // import { doc } from 'prettier';

//import { svelteRun } from './lib/v2/svelte';

//import './global.scss';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

// // //const root = document.body;

// // //m.state.routerPrefix = '#';
// m.route(root, '/', <MainPage />);
// m.route(root, '/app', <UITestPage />);
// m.route(root, '/page2', <Page2 />);
// // // // //m.route(root, '/effect', Top);
// m.route(root, '/context', <ContextRoot />);
// m.route(root, '/context2', <ContextRoot2 />);
// m.route(root, '/simple1', <Simple1 />);
// m.route(root, '/simple2', <Simple2 />);
// m.route(root, '/stack1', <Stack1 />);
// m.route(root, '/stack2', <Stack2 />);
// // // m.route(root, '/hyperscript', HyperScript);
// // // //m.route(root, '/jsonrequest', JSONRequest);
// m.route(root, '/404', <ErrorPage />);

// function Child() {
//   return (
//     <div>
//       <div>element 4</div>
//     </div>
//   );
// }

// function Element() {
//   return (
//     <div>
//       <span>element 3</span>
//       <Child />
//     </div>
//   );
// }

// m.rendered(() => {
//   m.rendered(() => {
//     console.log(root.outerHTML);
//   });
//   m.render(<Element />, root);
// });
// m.render(
//   <div>
//     <div>element 1</div>
//     <div>element 2</div>
//   </div>,
//   root,
// );

// setTimeout(() => {
//   m.render(<ContextRoot />, document.body);
// }, 500);

//svelteRun(root);

//m.render(root, TriangleDemo);

m.config.setVerbose(true);

export const ContextChild1 = (): JSX.Element => {
  //const [value, setValue] = useContext(UserContext);
  const value = 'moose';
  return (
    <>
      <div>Child 1 value: {value}</div>
      <button
        onclick={() => {
          //setValue('duck');
        }}
      >
        Change 2
      </button>
    </>
  );
};

export const ContextChild2 = (): JSX.Element => {
  //const [value, setValue] = useContext(UserContext);
  const value = 'moose';
  return (
    <>
      <div>Child 2 value: {value}</div>
      <button
        onclick={() => {
          //setValue('fish');
        }}
      >
        Change 2
      </button>
    </>
  );
};

m.rendered(() => {
  m.render(
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>
        Context Page 1 should share context with{' '}
        <a href='#/context2'>Context Page 2</a>.
      </p>

      <div>
        <ContextChild1 />
        <ContextChild2 />
      </div>
    </>,
    root,
  );

  // renderDone(done, () => {
  //   expect(document.body.outerHTML).toBe(
  //     '<body><a title="home" href="#/">Back</a><p>Context Page 1 should share context with <a href="#/context2">Context Page 2</a>.</p><div><div>Child 1 value: moose</div><button>Change 2</button><div>Child 2 value: moose</div><button>Change 2</button></div></body>',
  //   );
  // });
});
m.render(
  <>
    <div>
      <a title='page1' href='#/app'>
        Go to UI Testing Page
      </a>
    </div>
    <div>
      <a title='page2' href='#/page2'>
        Go to Page 2
      </a>
    </div>
    <div>
      <a title='effect' href='#/effect'>
        Go to Effect Page
      </a>
    </div>
    <div>
      <a title='context' href='#/context'>
        Go to Context Page
      </a>
    </div>
    <div>
      <a title='context' href='#/context2'>
        Go to Context 2 Page
      </a>
    </div>
    <div>
      <a title='hyperscript' href='#/hyperscript'>
        Go to HyperScript Page
      </a>
    </div>
    <div>
      <a title='jsonrequest' href='#/jsonrequest'>
        Go to JSON Request Page
      </a>
    </div>
    <div>
      <a title='error' href='#/404'>
        Go to Error Page
      </a>
    </div>
  </>,
  root,
);
