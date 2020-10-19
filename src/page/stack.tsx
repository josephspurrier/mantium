// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib/v2';

export const Stack1 = (): JSX.Element => {
  return (
    <div>
      <div>
        <a title='home' href='#/'>
          Back
        </a>
      </div>
      <p>
        <a href='#/stack2'>Go to Stack 2</a>
      </p>
      <div>
        <div>Animal 1</div>
        <div>Animal 2</div>
        <div>Animal 3</div>
      </div>
    </div>
  );
};

export const Stack2 = (): JSX.Element => {
  return (
    <div>
      <div>
        <a title='home' href='#/'>
          Back
        </a>
      </div>
      <p>
        <a href='#/stack1'>Go to Stack 1</a>
      </p>
      <div>
        <div>Animal 2</div>
        <div>Animal 3</div>
      </div>
    </div>
  );
};
