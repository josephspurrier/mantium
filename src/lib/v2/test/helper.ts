import { m } from '../index';

export function renderDone(done: jest.DoneCallback, exp: () => void): void {
  function callback() {
    try {
      exp();
      done();
    } catch (error) {
      done(error);
    }
  }

  m.rendered(callback);
}
