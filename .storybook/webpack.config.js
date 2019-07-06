const { rules } = require('../webpack.custom');

module.exports = ({ config }) => {
  config.module.rules.push(
    ...rules,
    {
      test: /\.scss$/,
      loaders: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localsConvention: 'camelCase',
          },
        },
        require.resolve('sass-loader')
      ],
    },
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
