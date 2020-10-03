import { render } from './render';
import { batchState, useState } from './usestate';
import { createVnode } from './vnode';
import { createFragment } from './fragment';
import { redraw } from './vdom';
import { route } from './router';
import { request } from './request';
import { resetState, state } from './state';
import { useEffect } from './useeffect';
import { createContext } from './usecontext';

export const m = {
  state: state,
  resetState: resetState,
  fragment: createFragment,
  createElement: createVnode,
  createContext: createContext,
  render: render,
  redraw: redraw,
  useState: useState,
  batchState: batchState,
  useEffect: useEffect,
  route: route,
  request: request,
};
