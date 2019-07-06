const { rules } = require('../webpack.custom');

module.exports = ({ config }) => {
  config.module.rules.push(...rules);
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
