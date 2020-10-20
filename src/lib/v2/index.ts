import { createElement, createFragment } from './mnode';
import { renderNow } from './render';
import { useState } from './usestate';
import { redraw, render } from './commit';
import { route } from './route';
import {
  rendered,
  setWorkMode,
  setCommitWorkFunc,
  resetCommitWorkFunc,
} from './scheduler';

export const config = {
  setVerbose,
  setWorkMode,
  setCommitWorkFunc,
  resetCommitWorkFunc,
};

export const m = {
  createElement,
  createFragment,
  render,
  renderNow,
  useState,
  redraw,
  route,
  rendered,
  config,
};

// If true, then will output verbose console.log messages.
export let verbose = false;

function setVerbose(value: boolean): void {
  verbose = value;
}
