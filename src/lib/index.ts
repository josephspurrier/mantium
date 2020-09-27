import { render } from './render';
import { useState } from './usestate';
import { createVnode } from './vnode';
import { createFragment } from './fragment';
import { redraw } from './vdom';
import { route } from './router';
import { request } from './request';
import { state } from './state';

export const m = {
  state: state,
  fragment: createFragment,
  createElement: createVnode,
  render: render,
  redraw: redraw,
  useState: useState,
  route: route,
  request: request,
};

export const h = createVnode;
