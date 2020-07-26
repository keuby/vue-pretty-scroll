import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import banner from 'rollup-plugin-banner';

const extensions = ['.js', '.ts'];

const bannerContent = `
<%= pkg.name %> v<%= pkg.version %>
release at ${new Date().toLocaleDateString()}
by <%= pkg.author %>
github <%= pkg.homepage %>
`.trim();

const outputs = {
  umd: {
    file: pkg.main,
    format: 'umd',
    name: 'PrettyScroll',
  },
  esm: {
    file: pkg.module,
    format: 'esm',
    name: 'PrettyScroll',
  },
};

const plugins = [
  typescript(),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: ['@babel/preset-typescript'],
    extensions,
  }),
  banner(bannerContent),
];

const format = process.env.format || 'umd';
format === 'umd' && plugins.splice(2, 0, uglify());

export default {
  input: 'src/index.ts',
  output: outputs[format],
  plugins,
  external: ['@better-scroll/core', '@better-scroll/scroll-bar', '@better-scroll/mouse-wheel'],
};
