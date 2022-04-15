module.exports = {
  babelrcRoots: ['.'],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: {
          version: '3',
          modules: false
        }
      }
    ],
    ['@babel/preset-react']
  ],
  plugins: ['@babel/plugin-transform-runtime']
};