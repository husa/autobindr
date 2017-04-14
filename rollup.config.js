import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'autobind',
  plugins: [babel()],
  dest: 'dist/autobindr.js'
};
