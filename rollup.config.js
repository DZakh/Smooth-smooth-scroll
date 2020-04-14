import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const PACKAGE_BUNDLE = {
  input: 'src/index.js',
  output: {
    name: 'smooth-smooth-scroll',
    file: 'build/index.min.js',
    format: 'umd',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser({
      include: [/^.+\.min\.js$/],
    }),
  ],
};

export default PACKAGE_BUNDLE;
