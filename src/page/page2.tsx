// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';

export const Page2 = (): JSX.Element => {
  const [, setPost] = m.useState('test');
  setPost('another');
  m.redraw('page2');
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>Page 2.</p>
      <button
        onclick={() => {
          m.redraw();
        }}
      >
        Redraw
      </button>
    </>
  );
};
