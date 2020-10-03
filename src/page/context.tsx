// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';
import { useContext } from '../lib/usecontext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserContext = m.createContext('monkey');

export const ContextRoot = (): JSX.Element => {
  const value = useContext(UserContext);
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>Context page.</p>

      <UserContext.Provider value={'cool'}>
        <div>The value is: {value}</div>
      </UserContext.Provider>
    </>
  );
};
