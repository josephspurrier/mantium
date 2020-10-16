// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib/v2';
//import { useContext } from '../lib/usecontext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//export const UserContext = m.createContext('monkey');

m.config.setVerbose(true);

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
        Change 1
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
    </>
  );
};
