module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'ramda',
    'module:@babel/plugin-proposal-class-properties',
    'module:@babel/plugin-proposal-export-default-from',
    'module:@babel/plugin-proposal-optional-chaining',
    'module:@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'ant',
    ],
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
