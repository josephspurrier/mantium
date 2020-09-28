import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/lib/index.ts',
  output: [
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
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
    nodeResolve(),
  ],
};
