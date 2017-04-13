import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'autobindr',
  plugins: [babel()],
  dest: 'dist/autobindr.js'
};
