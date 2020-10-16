// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib/v2';

export const Simple1 = (): JSX.Element => {
  return (
    <div>
      <a title='home' href='#/'>
        Back
      </a>
      <p>
        Simple Page 1 should share context with{' '}
        <a href='#/simple2'>Simple Page 2</a>.
      </p>

      <div>Cool</div>
    </div>
  );
};

export const Simple2 = (): JSX.Element => {
  return (
    <div>
      <a title='home' href='#/'>
        Back
      </a>
      <p>
        Simple Page 2 should share context with{' '}
        <a href='#/simple1'>Simple Page 1</a>.
      </p>

      <span></span>
    </div>
  );
};
