import { m } from '../lib';

describe('state testing', () => {
  beforeEach(() => {
    // Jest does not clean the JSDOM document after each test run! It only
    // clears the DOM after all tests inside an entire file are completed.
    m.resetState();
    document.body.innerHTML = '';
  });

  const UseStateValue = (): JSX.Element => {
    const [count, setCount] = m.useState(1);
    return (
      <>
        <button
          id='btnCounter'
          onclick={() => {
            setCount(count + 1);
          }}
        >
          Change Value
        </button>
        <div>
          Current value: <span id='counter'>{count}</span>
        </div>
      </>
    );
  };

  test('useState value', () => {
    m.render(document.body, UseStateValue);
    const btn = document.getElementById('btnCounter');
    const value = document.getElementById('counter');
    expect(value?.textContent).toBe('1');
    btn?.click();
    expect(value?.textContent).toBe('2');
    btn?.click();
    expect(value?.textContent).toBe('2');
  });

  const UseStateFunc = (): JSX.Element => {
    const [count, setCount] = m.useState(1);
    return (
      <>
        <button
          id='btnCounter'
          onclick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          Change Value
        </button>
        <div>
          Current value: <span id='counter'>{count}</span>
        </div>
      </>
    );
  };

  test('useState function', () => {
    m.render(document.body, UseStateFunc);
    const btn = document.getElementById('btnCounter');
    const value = document.getElementById('counter');
    expect(value?.textContent).toBe('1');
    btn?.click();
    expect(value?.textContent).toBe('2');
    btn?.click();
    expect(value?.textContent).toBe('3');
  });
});
