module.exports = {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('awesome-typescript-loader'),
                },
            ],
        },
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
        }
    ]
}