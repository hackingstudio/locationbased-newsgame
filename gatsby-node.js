const { rules } = require('./webpack.custom');

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules,
    },
  })
}

exports.resolvableExtensions = () => [`.ts`, `.tsx`];
