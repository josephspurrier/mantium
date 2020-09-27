// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';

const h = m.createElement;

const SingleDiv = (): JSX.Element => {
  return h('div', {}, 'This is a returning div.');
};

export const HyperScript = (): JSX.Element => {
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>Page HyperScript.</p>

      <SingleDiv />

      {h('div', {}, 'This is a non returning div.')}
    </>
  );
};
