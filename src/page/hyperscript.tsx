// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m, h } from '../lib';

const SingleDiv = (): JSX.Element => {
  return h('div', {}, 'This is a JSX div.');
};

export const HyperScript = (): JSX.Element => {
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>Page HyperScript.</p>

      <SingleDiv />

      {h('div', {}, 'This is a HyperScript div.')}
    </>
  );
};
