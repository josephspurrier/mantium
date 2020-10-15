// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';
import { useEffect } from '../lib/useeffect';
//import { createSignal, onCleanup, createMemo, createDeferred } from 'solid-js';
import { useState } from '../lib/usestate';

const TARGET = 25;

// export const TriangleDemo = (): JSX.Element => {
//   return (
//     <div
//       class='container'
//       style={{
//         transform: `scaleX(${4.2 / 2.1}) scaleY(0.7) translateZ(0.1px)`,
//       }}
//     >
//       Test
//     </div>
//   );
// };

export const TriangleDemo = (): JSX.Element => {
  const [elapsed, setElapsed] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start] = useState(Date.now());

  const scale = () => {
    const e = (elapsed / 1000) % 10;
    return 1 + (e > 5 ? 10 - e : e) / 10;
  };

  //const start = Date.now();
  //console.log('Now', start);

  let f: number;

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((prev) => (prev % 10) + 1);
    }, 1000);

    const update = () => {
      setElapsed(Date.now() - start);
      //console.log('here');
      f = requestAnimationFrame(update);
    };
    f = requestAnimationFrame(update);
    //console.log('add');
    return () => {
      //console.log('remove');
      clearInterval(t), cancelAnimationFrame(f);
    };
  }, []);

  //console.log('Scale:', scale());

  return (
    <div>
      <h1>Solid Triangle Demo</h1>
      <p>Try throttling your CPU on Performance tab of Chrome Debugger</p>
      <div
        class='container'
        style={{
          transform: `scaleX(${scale() / 2.1}) scaleY(0.7) translateZ(0.1px)`,
        }}
      >
        <Triangle x={0} y={0} s={1000} seconds={seconds} />
      </div>
    </div>
  );
};

interface Attrs {
  x: number;
  y: number;
  s: number;
  seconds: number;
}

const Triangle = ({ x, y, s, seconds }: Attrs) => {
  if (s <= TARGET) {
    return (
      <Dot x={x - TARGET / 2} y={y - TARGET / 2} s={TARGET} text={seconds} />
    );
  }
  s = s / 2;

  //console.log('s:', s);

  if (s === 62.5) {
    //console.log('boom');
    //seconds; //seconds = createDeferred(seconds);
  }

  // var slowDown = true;
  // if (slowDown) {
  //   var e = performance.now() + 0.8;
  //   while (performance.now() < e) {
  //     // Artificially long execution time.
  //   }
  // }

  return (
    <>
      <Triangle x={x} y={y - s / 2} s={s} seconds={seconds} />
      <Triangle x={x - s} y={y + s / 2} s={s} seconds={seconds} />
      <Triangle x={x + s} y={y + s / 2} s={s} seconds={seconds} />
    </>
  );
};

interface Attrs2 {
  x: number;
  y: number;
  s: number;
  text: number;
}

const Dot = ({ x, y, s, text }: Attrs2) => {
  const [hover, setHover] = useState(false),
    onEnter = () => setHover(true),
    onExit = () => setHover(false);
  //console.log(x, y);
  return (
    <div
      class='dot'
      style={{
        width: `${s}px`,
        height: `${s}px`,
        left: `${x}px`,
        top: `${y}px`,
        'border-radius': `${s / 2}px`,
        'line-height': `${s}px`,
        background: hover ? '#ff0' : '#61dafb',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
    >
      {hover ? `**${text}**` : text}
    </div>
  );
};
