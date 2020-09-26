import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/lib/index.ts',
  output: {
    dir: 'dist/cjs',
    format: 'es',
    name: 'mantium',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.rollup.cjs.json',
    }),
    nodeResolve(),
  ],
};
