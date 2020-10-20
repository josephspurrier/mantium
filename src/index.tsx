/* eslint-disable @typescript-eslint/no-unused-vars */
import { Full } from './full';
import { m } from './lib/v2';
import { RunTest1 } from './test1';
import { RunTest2 } from './test2';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

m.config.setVerbose(true);

// Full(root);
RunTest1();
// RunTest2();

//m.render('hello world', document.body);
