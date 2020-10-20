// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib/v2';

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

export function RunTest1(): void {
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
      document.body,
    );
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
    document.body,
  );
}