// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from '@/lib/z';

export const ErrorPage = (): JSX.Element => {
  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <p>404 Page Not Found</p>
    </>
  );
};
