import { render } from './render';
import { batchState, useState } from './usestate';
import { createVnode } from './vnode';
import { createFragment } from './fragment';
import { redraw } from './vdom';
import { route } from './router';
import { request } from './request';
import { resetState, state } from './state';

export const m = {
  state: state,
  resetState: resetState,
  fragment: createFragment,
  createElement: createVnode,
  render: render,
  redraw: redraw,
  useState: useState,
  batchState: batchState,
  route: route,
  request: request,
};
