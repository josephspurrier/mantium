import { renderDone } from './helper';
import { m } from '../index';

const MainPage = (): JSX.Element => {
  return (
    <div>
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
    </div>
  );
};

export const ContextChild1 = (): JSX.Element => {
  //const [value, setValue] = useContext(UserContext);
  const value = 'moose';
  return (
    <div>
      <div>Child 1 value: {value}</div>
      <button
        onclick={() => {
          //setValue('duck');
        }}
      >
        Change 2
      </button>
    </div>
  );
};

export const ContextChild2 = (): JSX.Element => {
  //const [value, setValue] = useContext(UserContext);
  const value = 'moose';
  return (
    <div>
      <div>Child 2 value: {value}</div>
      <button
        onclick={() => {
          //setValue('fish');
        }}
      >
        Change 2
      </button>
    </div>
  );
};

export const ContextRoot = (): JSX.Element => {
  return (
    <div>
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
    </div>
  );
};

test('render with div and then rerender with fragment with different elements', (done) => {
  m.render(MainPage(), document.body);

  m.rendered(() => {
    m.render(ContextRoot(), document.body);

    renderDone(done, () => {
      expect(document.body.outerHTML).toBe(
        '<body><div><a title="home" href="#/">Back</a><p>Context Page 1 should share context with <a href="#/context2">Context Page 2</a>.</p><div><div><div>Child 1 value: moose</div><button>Change 2</button></div><div><div>Child 2 value: moose</div><button>Change 2</button></div></div></div></body>',
      );
    });
  });
});
