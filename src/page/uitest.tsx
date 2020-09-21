// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from '@/lib/z';
import { Empty } from '@/component/empty';
import { FragLevel1 } from '@/component/fragments';
import { State } from '@/component/state';
import { RedrawButtons } from '@/component/redraw';
import { BooleanFlip } from '@/component/boolean';

const Destructuring = ({ username }: { username: string }): JSX.Element => {
  return <div>Destructuring should show foo: {username}</div>;
};

interface InterfacingAttrs {
  username: string;
}
const Interfacing = (attrs: InterfacingAttrs): JSX.Element => {
  return <div>Interfacing should show bar: {attrs.username}</div>;
};

interface SingleChildStringAttrs {
  children: string;
}

const SingleChildText = (attrs: SingleChildStringAttrs): JSX.Element => {
  return <div>Child should be Saturn: {attrs.children}</div>;
};

interface NestedChildElementAttrs {
  children: JSX.Element;
}

const NestedChildElement = (attrs: NestedChildElementAttrs): JSX.Element => {
  return (
    <div>
      Child below should be Mars in a {`<div>`} and {`<span>`}: {attrs.children}
    </div>
  );
};

interface TwoFragmentsAttrs {
  username: string;
}

const TwoFragments = (attrs: TwoFragmentsAttrs): JSX.Element => {
  return (
    <>
      <div cool={attrs.username}>This is fragment A.</div>
      <div>This is fragment B.</div>
    </>
  );
};

interface FragmentsAttrs {
  num1: string;
  num2: string;
  children: JSX.Element | string;
}

const FragmentChild = (attrs: FragmentsAttrs): JSX.Element => {
  return (
    <>
      <div name={attrs.num1}>div {attrs.num1}</div>
      {attrs.children}
      <div name={attrs.num2}>div {attrs.num2}</div>
    </>
  );
};

interface RequiredAttrs {
  required: boolean;
}

const RequiredTrue = (attrs: RequiredAttrs): JSX.Element => {
  return (
    <div required={attrs.required}>
      This is a div with a required attribute that should be set (true).
    </div>
  );
};
const RequiredFalse = (attrs: RequiredAttrs): JSX.Element => {
  return (
    <div required={attrs.required}>
      This is a div with a required attribute that is not set (false).
    </div>
  );
};

const firstname = 'User';
const alphabet = ['Alpha', 'Bravo', 'Charlie'];

// // Create some dom elements
export const UITestPage = (): JSX.Element => {
  return (
    <div class='app'>
      <a title='home' href='#/'>
        Back
      </a>

      <p>Welcome back, {firstname}.</p>

      <Empty></Empty>
      <Destructuring username='foo' />
      <Interfacing username='bar' />

      <SingleChildText>Saturn</SingleChildText>

      <NestedChildElement>
        <div>
          <span>Mars</span>
        </div>
      </NestedChildElement>

      <TwoFragments username='josephspurrier' />

      <FragmentChild num1='10A' num2='10B'>
        <div>Text should be in a div.</div>
      </FragmentChild>

      <FragmentChild num1='20A' num2='20B'>
        Text is not in a div.
      </FragmentChild>

      <hr />

      <RequiredTrue required={true} />
      <RequiredFalse required={false} />

      <hr />

      <State />
      <State />

      <hr />

      <RedrawButtons />

      <hr />

      <FragLevel1 />

      <hr />

      <BooleanFlip />

      <hr />

      <p>
        <strong>Below are list items from an array:</strong>
      </p>
      <ul>
        {alphabet.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
};
