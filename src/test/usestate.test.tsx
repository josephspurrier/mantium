import { resetState } from '../lib/usestate';
import { m } from '../lib';

// Jest does not clean the JSDOM document after each test run! It only clears
// the DOM after all tests inside an entire file are completed.
describe('my test suite', () => {
  afterEach(() => {
    //document.getElementsByTagName('html')[0].innerHTML = '';
    // document.body.innerHTML = '';
    // document.head.innerHTML = '';
    //console.log(m.state);
    resetState();
    console.log('cleared');
    //document.body.innerHTML = '';
    //console.log('Nodes:', document.body);
    // const lista = document.body.childNodes;
    // for (let i = lista.length - 1; i >= 0; i--) {
    //   document.body.removeChild(lista[i]);
    // }
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
    console.log('body:', document.body.innerHTML);

    //console.log('start:', );
    //document.body.innerHTML = '';
    //console.log('end:', document.body);

    m.render(document.body, UseStateValue);
    const btn = document.getElementById('btnCounter');
    const value = document.getElementById('counter');
    expect(value?.textContent).toBe('1');
    btn?.click();
    expect(value?.textContent).toBe('2');
    btn?.click();
    expect(value?.textContent).toBe('2');
    console.log('done1');
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
    console.log('start2:', document.body.outerHTML);
    resetState();
    document.body.outerHTML = '';
    //console.log('body2:', document.body.innerHTML);
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
