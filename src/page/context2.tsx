// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';
import { useContext } from '../lib/usecontext';
import { UserContext } from './context';

export const ContextChild1 = (): JSX.Element => {
  const [value, setValue] = useContext(UserContext);
  return (
    <>
      <div>Child 1 value: {value}</div>
      <button
        onclick={() => {
          console.log('clicked 1');
          setValue('duck');
        }}
      >
        Change 2
      </button>
    </>
  );
};

export const ContextChild2 = (): JSX.Element => {
  const [value, setValue] = useContext(UserContext);
  return (
    <>
      <div>Child 2 value: {value}</div>
      <button
        onclick={() => {
          console.log('clicked 2');
          setValue('fish');
        }}
      >
        Change 2
      </button>
    </>
  );
};

export const ContextRoot2 = (): JSX.Element => {
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>
        Context Page 2 should share context with{' '}
        <a href='#/context'>Context Page 1</a>.
      </p>

      <div>
        <ContextChild1 />
        <ContextChild2 />
      </div>
    </>
  );
};
