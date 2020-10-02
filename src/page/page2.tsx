// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';

export const Page2 = (): JSX.Element => {
  // Examples of what not to do

  const [, setPost] = m.useState('test');
  // Don't use a useState setter outside of a useEffect because it will trigger
  // a redraw.
  setPost('another');

  // Don't call redraw() outside of a useEffect because it will trigger a
  // redraw.
  m.redraw('page2');
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>
        This is an example of what not to do. Open the console to see the error.
      </p>
      <button
        onclick={() => {
          // This is perfectly acceptable and suggested when not calling a
          // function that triggers a redraw like a useState settier, but it
          // will still show a warning in the console in this example because
          // the useEffect setter above is being called as well during the
          // redraw.
          m.redraw();
        }}
      >
        Redraw
      </button>
    </>
  );
};
