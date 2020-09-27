/* eslint-disable @typescript-eslint/ban-ts-comment */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// @ts-ignore
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/lib/index.ts',
  output: [
    // {
    //   file: 'dist/index.browser.min.js',
    //   format: 'iife',
    //   name: 'mantium',
    //   plugins: [
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //     uglify(),
    //   ],
    // },
    // {
    //   file: 'dist/index.browser.js',
    //   format: 'iife',
    //   name: 'mantium',
    // },
    // {
    //   file: 'dist/index.cjs.js',
    //   format: 'cjs',
    //   name: 'mantium',
    // },
    // {
    //   file: 'dist/index.system.js',
    //   format: 'system',
    //   name: 'mantium',
    // },
    // {
    //   file: 'dist/index.amd.js',
    //   format: 'amd',
    //   name: 'mantium',
    // },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'mantium',
    },
    {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'mantium',
      plugins: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        uglify(),
      ],
    },
    // {
    //   file: 'dist/index.esm.js',
    //   format: 'es',
    //   name: 'mantium',
    // },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
    nodeResolve(),
  ],
};
