// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from './lib/v2';

function Child() {
  return (
    <>
      <div>element 4</div>
    </>
  );
}

function Element() {
  return (
    <>
      <span>element 3</span>
      <Child />
    </>
  );
}

export function RunTest2(): void {
  m.rendered(() => {
    m.render(<Element />, document.body);
  });

  m.render(
    <div>
      <div>element 1</div>
      <div>element 2</div>
    </div>,
    document.body,
  );
}
