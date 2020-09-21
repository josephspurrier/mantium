// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from '@/lib/z';

export const FragLevel1 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 1.</div>
      <FragLevel2 />
    </>
  );
};

export const FragLevel2 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 2.</div>
      <FragLevel3 />
    </>
  );
};

export const FragLevel3 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 3.</div>
      <FragLevel4 />
    </>
  );
};

export const FragLevel4 = (): JSX.Element => {
  return (
    <>
      <div>Fragment level 4.</div>
    </>
  );
};
