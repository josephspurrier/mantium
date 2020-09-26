/* eslint-disable @typescript-eslint/ban-ts-comment */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// @ts-ignore
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/lib/index.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    name: 'mantium',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.rollup.es.json',
    }),
    nodeResolve(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    uglify(),
  ],
};
