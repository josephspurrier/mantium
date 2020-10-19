// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib/v2';

export const MainPage = (): JSX.Element => {
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
        <a title='context' href='#/simple1'>
          Go to Simple 1 Page
        </a>
      </div>
      <div>
        <a title='context' href='#/simple2'>
          Go to Simple 2 Page
        </a>
      </div>
      <div>
        <a title='context' href='#/stack1'>
          Go to Stack 1 Page
        </a>
      </div>
      <div>
        <a title='context' href='#/stack2'>
          Go to Stack 2 Page
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
